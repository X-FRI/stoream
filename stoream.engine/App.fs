module stoream.engine.App

open System
open System.IO
open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Cors.Infrastructure
open Microsoft.AspNetCore.Hosting
open Microsoft.Extensions.Hosting
open Microsoft.Extensions.Logging
open Microsoft.Extensions.DependencyInjection
open Microsoft.OpenApi.Models
open Giraffe
open Giraffe.EndpointRouting
open stoream.engine.Module.Auth
open stoream.engine.Module.Infrastructure
open stoream.engine.Module.Infrastructure.Logger

let App = [ AuthModule.Endpoints ]

let ErrorHandler (ex : Exception) (logger : ILogger) =
    logger.LogError (ex, "An unhandled exception has occurred while executing the request.")
    clearResponse >=> setStatusCode 500 >=> text ex.Message

let ConfigureCors (builder : CorsPolicyBuilder) =
    builder
        .WithOrigins("http://localhost:5000", "https://localhost:5001", "http://localhost:5173")
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials ()
    |> ignore

let ConfigureApp (app : IApplicationBuilder) =
    let env = app.ApplicationServices.GetService<IWebHostEnvironment> ()
    begin
        match env.IsDevelopment () with
        | true -> app.UseDeveloperExceptionPage ()
        | false -> app.UseGiraffeErrorHandler(ErrorHandler).UseHttpsRedirection ()
    end
        .UseCors(ConfigureCors)
        .UseRouting()
        .UseSwagger()
        .UseSwaggerUI()
        .UseGiraffe(App)
        .UseGiraffe (setStatusCode 404 >=> text "Not Found")

let ConfigureServices (services : IServiceCollection) =
    let openApiInfo = OpenApiInfo ()
    openApiInfo.Description <- "stoream"
    openApiInfo.Title <- "stoream"
    openApiInfo.Version <- "v1"
    openApiInfo.Contact <- OpenApiContact ()
    openApiInfo.Contact.Name <- "Somhairle H. Marisol"
    openApiInfo.Contact.Email <- "muqiu-han@outlook.com"

    services
        .AddCors()
        .AddGiraffe()
        .AddRouting()
        .AddEndpointsApiExplorer()
        .AddSwaggerGen (fun opt ->
            opt.SwaggerDoc ("v1", openApiInfo)
            opt.SupportNonNullableReferenceTypes ())
    |> ignore

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
                .ConfigureLogging (ConfigureLogging)
            |> ignore)
        .Build()
        .Run ()
    0
