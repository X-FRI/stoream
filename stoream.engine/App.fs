module stoream.engine.App

open System
open System.IO
open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Cors.Infrastructure
open Microsoft.AspNetCore.Hosting
open Microsoft.Extensions.Hosting
open Microsoft.Extensions.Logging
open Microsoft.Extensions.DependencyInjection
open Giraffe
open stoream.engine.Module.Auth
open stoream.engine.Module.Infrastructure
open stoream.engine.Module.Infrastructure.Logger

let App = choose [ AuthModule.Handlers; setStatusCode 404 >=> text "Not Found" ]

let ErrorHandler (ex : Exception) (logger : ILogger) =
    logger.LogError (ex, "An unhandled exception has occurred while executing the request.")
    clearResponse >=> setStatusCode 500 >=> text ex.Message

let ConfigureCors (builder : CorsPolicyBuilder) =
    builder.WithOrigins("http://localhost:5000", "https://localhost:5001").AllowAnyMethod().AllowAnyHeader ()
    |> ignore

let ConfigureApp (app : IApplicationBuilder) =
    let env = app.ApplicationServices.GetService<IWebHostEnvironment> ()
    begin
        match env.IsDevelopment () with
        | true -> app.UseDeveloperExceptionPage ()
        | false -> app.UseGiraffeErrorHandler(ErrorHandler).UseHttpsRedirection ()
    end
        .UseCors(ConfigureCors)
        .UseGiraffe
        App

let ConfigureServices (services : IServiceCollection) = services.AddCors().AddGiraffe().AddRouting () |> ignore

let ConfigureLogging (builder : ILoggingBuilder) = builder.AddConsole().AddDebug () |> LoggingBuilder

[<EntryPoint>]
let main args =
    Logger.LogInformation "Starting Stoream Engine"
    DB.Initialize ()
    let contentRoot = Directory.GetCurrentDirectory ()
    Host
        .CreateDefaultBuilder(args)
        .ConfigureWebHostDefaults(fun webHostBuilder ->
            Logger.LogInformation "Initializing configuration"
            webHostBuilder
                .UseContentRoot(contentRoot)
                .Configure(Action<IApplicationBuilder> ConfigureApp)
                .ConfigureServices(ConfigureServices)
                .ConfigureLogging
                ConfigureLogging
            |> ignore)
        .Build()
        .Run ()
    0
