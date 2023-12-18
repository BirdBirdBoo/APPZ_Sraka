using System.Reflection;
using System.Text.Json;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using Server.Contexts;
using Server.Extensions.Swagger;
using Server.Models.Entities;
using Server.Models.Requests;
using Server.Providers;
using Server.Repositories;
using Server.Services;
using AutoMapper;

var builder = WebApplication.CreateBuilder(args);
IConfigProvider configProvider = new ConfigProvider(builder.Configuration);

// Add services to the container.
builder.Services.AddDbContext<QualityLifeDbContext>(opts =>
{
    opts.UseSqlServer(builder.Configuration.GetConnectionString("sql-server"));
});

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IDoctorService, DoctorService>();
builder.Services.AddScoped<IPatientService, PatientService>();
builder.Services.AddScoped<IAnalysisService, AnalysisService>();
builder.Services.AddScoped<IMessageService, MessageService>();
builder.Services.AddScoped<IAnnotationService, AnnotationService>();

builder.Services.AddScoped<IAnalysisFilterService, AnalysisFilterService>();
builder.Services.AddScoped<ICriticalDefinerService, CriticalDefinerServiceMocked>();

builder.Services.AddScoped<IAuthorizationService, AuthorizationService>();
builder.Services.AddSingleton(configProvider);

if (configProvider.UserRepository.UseInMemoryRepository)
{
    builder.Services.AddScoped<IUserRepository, InMemoryUserRepository>();
    Console.WriteLine("inmemory");
}
else
{
    builder.Services.AddScoped<IUserRepository, DbUserRepository>();
    builder.Services.AddScoped<IDoctorRepository, DoctorRepository>();
    builder.Services.AddScoped<IPatientRepository, PatientRepository>();
    builder.Services.AddScoped<IAnalysisRepository, DbAnalysisRepository>();
    builder.Services.AddScoped<IMessageRepository, DbMessageRepository>();

    builder.Services.AddScoped<IChartsRepository, InMemoryChartRepository>();
}

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(opts =>
    {
        var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
        var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
        opts.IncludeXmlComments(xmlPath);
        opts.OperationFilter<AddDefaultValueOperation>();

        opts.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme,
            new OpenApiSecurityScheme
            {
                Description = "Test JWT Authorization using the Bearer scheme",
                Name = "Authorization",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.Http,
                Scheme = JwtBearerDefaults.AuthenticationScheme
            });

        opts.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = JwtBearerDefaults.AuthenticationScheme
                    },
                    Scheme = JwtBearerDefaults.AuthenticationScheme,
                    Name = JwtBearerDefaults.AuthenticationScheme,
                    In = ParameterLocation.Header
                },
                new List<string>()
            }
        });
    }
);

builder.Services
       .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
       .AddJwtBearer(opts => opts.TokenValidationParameters = new TokenValidationParameters
       {
           ValidateIssuer = true,
           ValidateActor = false,
           ValidateLifetime = false,
           ValidateIssuerSigningKey = true,
           ValidIssuer = configProvider.Jwt.Issuer,
           ValidAudience = configProvider.Jwt.Issuer,
           IssuerSigningKey = configProvider.Jwt.SecurityKey
       });

builder.Services.AddHttpContextAccessor();

builder.Services.
    AddSwaggerGen(options =>
    options.MapType<DateOnly>(() => new OpenApiSchema
    {
        Type = "string",
        Format = "date",
        Example = new OpenApiString("2022-01-01")
    })
    )
    .AddSwaggerGen(options =>
    options.MapType<DoctorId>(() => new OpenApiSchema
    {
        Type = "string",
        Format = "uuid",
        Example = new OpenApiString("44E2F46C-3972-47C3-9812-B60C46835714")
    }))
    .AddSwaggerGen(options =>
    options.MapType<PatientId>(() => new OpenApiSchema
    {
        Type = "string",
        Format = "uuid",
        Example = new OpenApiString("44E2F46C-3972-47C3-9812-B60C46835714")
    }))
    .AddSwaggerGen(options =>
    options.MapType<UserId>(() => new OpenApiSchema
    {
        Type = "string",
        Format = "uuid",
        Example = new OpenApiString("2F9E433F-B135-4597-804A-82849CD5F0E9")
    }))
    .AddSwaggerGen(options =>
    options.MapType<AnalysisId>(() => new OpenApiSchema
    {
        Type = "string",
        Format = "uuid",
        Example = new OpenApiString("2229E9E4-BD00-4011-9643-AF872A662A14")
    }));


/*builder.Services.AddCors(opts => opts.AddDefaultPolicy(b => b.WithOrigins("https://localhost:3000")
                                                             .AllowAnyHeader()
                                                             .AllowAnyMethod()
                                                             .AllowCredentials()
    )
);*/

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseCors();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapWhen(x => x.Request.Path.StartsWithSegments("/app"), c =>
{
    c.UseSpa(spa =>
    {
        spa.Options.SourcePath = Path.Join(app.Environment.ContentRootPath, "../client");

        if (app.Environment.IsDevelopment())
        {
            spa.UseReactDevelopmentServer("start");
        }
    });
});
app.MapControllers();

app.Run();