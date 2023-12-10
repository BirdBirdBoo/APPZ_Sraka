using System.Security.Claims;
using Server.Models.Entities;
using Server.Services;

namespace Server.Extensions;

public static class AuthorizationExtensions
{
    public static async Task<bool> CanAccessUserData(this ClaimsPrincipal userPrincipal,
        IAuthorizationService authorizationService, UserId userId, CancellationToken ct)
    {
        return await authorizationService.CanAccessUser(userPrincipal, userId, ct);
    }

    public static UserId? GetId(this ClaimsPrincipal userPrincipal)
    {
        var userIdString = userPrincipal.FindFirst("UserId")?.Value;

        if (userIdString is null)
        {
            return null;
        }

        return new UserId(Guid.Parse(userIdString));
    }
}