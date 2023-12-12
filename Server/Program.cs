using System.Reflection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Server.Contexts;
using Server.Extensions.Swagger;
using Server.Models.Entities;
using Server.Providers;
using Server.Repositories;
using Server.Services;
using AutoMapper;
using Server.Models.Mappers;

var builder = WebApplication.CreateBuilder(args);
IConfigProvider configProvider = new ConfigProvider(builder.Configuration);

// Add services to the container.
builder.Services.AddDbContext<QualityLifeDbContext>(opts =>
{
    opts.UseSqlServer(builder.Configuration.GetConnectionString("sql-server"));
});

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IDoctorService, DoctorService>();
builder.Services.AddScoped<IAuthorizationService, AuthorizationService>();
builder.Services.AddSingleton(configProvider);

builder.Services.AddAutoMapper(typeof(DoctorProfile));


if (configProvider.UserRepository.UseInMemoryRepository)
{
    builder.Services.AddScoped<IUserRepository, InMemoryUserRepository>();
    Console.WriteLine("inmemory");
}
else
{
    builder.Services.AddScoped<IUserRepository, DbUserRepository>();
    builder.Services.AddScoped<IDoctorRepository, DoctorRepository>();
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