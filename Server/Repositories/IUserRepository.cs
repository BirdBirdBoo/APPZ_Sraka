using Server.Models.Entities;

namespace Server.Repositories;

public interface IUserRepository
{
    Task<UserEntity> CreateUser(string email, DateOnly birthDate, string password, CancellationToken cancellationToken);

    Task<UserEntity?> GetUser(UserId id, CancellationToken cancellationToken);

    Task<UserEntity?> FindByEmailPassword(string email, string password, CancellationToken cancellationToken);
}