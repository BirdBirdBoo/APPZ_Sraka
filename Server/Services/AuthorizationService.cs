using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Server.Models.Entities;
using Server.Providers;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace Server.Services;

public class AuthorizationService : IAuthorizationService
{
    private readonly IConfigProvider _configProvider;
    private readonly IUserService _userService;

    public AuthorizationService(IConfigProvider configProvider, IUserService userService)
    {
        _configProvider = configProvider;
        _userService = userService;
    }

    public string CreateJwtToken(UserId userId, UserRole role)
    {
        var expiryDate = DateTime.Now.AddSeconds(_configProvider.Jwt.TokenValiditySeconds);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, userId.ToString()),
            new Claim(System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Exp, expiryDate.ToShortDateString()),
            new Claim("UserId", userId.ToString()),
            new Claim(ClaimTypes.Role, role.ToString()),
            new Claim(System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var token = new JwtSecurityToken(_configProvider.Jwt.Issuer,
            _configProvider.Jwt.Issuer,
            claims,
            expires: expiryDate,
            signingCredentials: new SigningCredentials(_configProvider.Jwt.SecurityKey, SecurityAlgorithms.HmacSha256));

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public async Task<bool> CanAccessUser(ClaimsPrincipal userPrincipal, UserId userId, CancellationToken ct)
    {
        if (userPrincipal.HasClaim("UserId", userId.ToString()))
        {
            return true;
        }

        return await _userService.IsInRole(userId, UserRole.Admin, ct);
    }
}