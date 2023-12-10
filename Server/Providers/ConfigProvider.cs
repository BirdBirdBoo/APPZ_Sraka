using System.Runtime.CompilerServices;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Server.Providers;

internal class ConfigProvider : IConfigProvider
{
    public ConfigProvider(IConfiguration configuration)
    {
        Jwt = new JwtConfig(configuration);
        UserRepository = new UserRepositoryConfig(configuration);
    }

    public IJwtConfig Jwt { get; }
    public IUserRepositoryConfig UserRepository { get; }

    private class JwtConfig : BaseConfig, IJwtConfig
    {
        internal JwtConfig(IConfiguration configuration) : base(configuration, "Authentication")
        {
        }

        public SecurityKey SecurityKey => Get(ConvertKey);

        public string Issuer => Get();

        public long TokenValiditySeconds => Get(Convert.ToInt64);

        private static SecurityKey ConvertKey(string stringKey)
        {
            return new SymmetricSecurityKey(Encoding.UTF8.GetBytes(stringKey));
        }
    }

    private class UserRepositoryConfig : BaseConfig, IUserRepositoryConfig
    {
        public UserRepositoryConfig(IConfiguration configuration) : base(configuration, "UsersRepository")
        {
        }

        public string DatabaseConnectionString => Get();
        public bool UseInMemoryRepository => Get(Convert.ToBoolean);
    }

    private class BaseConfig
    {
        private readonly string _configurationPrefix;
        protected readonly IConfiguration Configuration;

        protected BaseConfig(IConfiguration configuration, string configurationPrefix)
        {
            Configuration = configuration;
            _configurationPrefix = configurationPrefix;
        }

        protected string Get([CallerMemberName] string? property = null)
        {
            return Configuration[$"{_configurationPrefix}:{property}"];
        }

        protected TValue Get<TValue>(Func<string, TValue> convert, [CallerMemberName] string? property = null)
        {
            return convert(Get(property));
        }
    }
}