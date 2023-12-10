using System.Security.Claims;
using Server.Models.Entities;

namespace Server.Services;

public interface IAuthorizationService
{
    string CreateJwtToken(UserId userId, UserRole role);

    Task<bool> CanAccessUser(ClaimsPrincipal userPrincipal, UserId userId, CancellationToken ct);
}