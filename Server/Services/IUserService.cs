using Server.Models.Dtos;
using Server.Models.Entities;
using Server.Models.Requests;

namespace Server.Services;

public interface IUserService
{
    Task<(UserId, UserRole)> RegisterUser(RegisterRequest registerRequest, CancellationToken cancellationToken);

    Task<(UserId?, UserRole?)> TryLogIn(LoginRequest loginRequest, CancellationToken cancellationToken);

    Task<UserDataDto?> GetUserInfo(UserId userId, CancellationToken cancellationToken);
    Task<UserDataDto?> GetUserInfo(string email, CancellationToken cancellationToken);

    Task<bool> IsInRole(UserId userId, UserRole role, CancellationToken ct);
}