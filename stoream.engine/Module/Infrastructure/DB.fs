module stoream.engine.Module.Infrastructure.DB

open System
open System.Data
open Dapper
open Microsoft.Data.Sqlite
open Microsoft.Extensions.Logging
open stoream.engine.Module.Infrastructure.Logger

/// <summary>
/// Database connection for the global repository.
/// </summary>
let mutable DB : IDbConnection = null

/// <summary>
/// Initializing the database safely, if the connection.State is Open, then register the Dapper, otherwise,
/// choose whether to create and initialize a new database based on user input.
/// </summary>
/// <returns>Database connection and whether initialization is required</returns>
let private safeInit (connection : IDbConnection) =
    Logger.LogInformation "Safe initializing database"
    Logger.LogInformation $"{connection.State}"

    match connection.State with
    | ConnectionState.Open ->
        Dapper.FSharp.SQLite.OptionTypes.register ()
        (connection, false)
    | _ ->
        Logger.LogWarning "The database file was not found. Do you want to create and initialize it? [Y/n]"
        match Console.ReadLine () |> _.ToLower() with
        | "n" ->
            Logger.LogInformation "Bye."
            Environment.Exit 0
            failwith "" // Make compiler happy :)
        | _ ->
            Dapper.FSharp.SQLite.OptionTypes.register ()
            connection.Open ()
            (connection, true)

module private Users =

    let Initialize (connection : IDbConnection) =
        Logger.LogInformation "Creating Users table"
        "DROP TABLE IF EXISTS Users" |> connection.Execute |> ignore

        """
        CREATE TABLE Users (
          Id TEXT PRIMARY KEY,
          Username TEXT(64) UNIQUE,
          PasswordHash TEXT(64) NULL
        );
            """
        |> connection.Execute
        |> ignore

        connection

let Initialize () =
    Logger.LogInformation "Connecting to database"

    DB <-
        begin
            match new SqliteConnection "Data Source=./stoream.db" |> safeInit with
            | connection, true -> connection |> Users.Initialize
            | connection, false -> connection
        end

    Logger.LogInformation "Database initialization completed"
