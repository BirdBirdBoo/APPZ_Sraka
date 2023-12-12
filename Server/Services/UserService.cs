using Server.Models.Dtos;
using Server.Models.Entities;
using Server.Models.Requests;
using Server.Repositories;

namespace Server.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<(UserId, UserRole)> RegisterUser(RegisterRequest registerRequest, CancellationToken cancellationToken)
    {
        var (email, password, birthDate, firstName, lastName, phoneNumber) = registerRequest;

        var newUser = await _userRepository.CreateUser(email, birthDate, password, firstName, lastName, phoneNumber, cancellationToken);

        return (newUser.UserId, newUser.Role);
    }

    public async Task<(UserId?, UserRole?)> TryLogIn(LoginRequest loginRequest, CancellationToken cancellationToken)
    {
        var user = await _userRepository.FindByEmailPassword(loginRequest.Email, loginRequest.Password,
            cancellationToken);

        return (user?.UserId, user?.Role);
    }

    public async Task<UserDataDto?> GetUserInfo(UserId userId, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetUser(userId, cancellationToken);

        return UserDataDto.FromEntity(user);
    }

    public async Task<bool> IsInRole(UserId userId, UserRole role, CancellationToken ct)
    {
        var userData = await GetUserInfo(userId, ct);
        return userData?.Role == role;
    }
}