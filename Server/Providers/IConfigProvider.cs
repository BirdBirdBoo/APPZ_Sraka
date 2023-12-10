using Microsoft.IdentityModel.Tokens;

namespace Server.Providers;

public interface IConfigProvider
{
    IJwtConfig Jwt { get; }

    IUserRepositoryConfig UserRepository { get; }
}

public interface IUserRepositoryConfig
{
    string DatabaseConnectionString { get; }

    bool UseInMemoryRepository { get; }
}

public interface IJwtConfig
{
    SecurityKey SecurityKey { get; }

    string Issuer { get; }

    long TokenValiditySeconds { get; }
}