using Server.Models.Entities;

namespace Server.Repositories;

public class InMemoryUserRepository : IUserRepository
{
    private readonly IDictionary<UserId, UserEntity> _userStore = new Dictionary<UserId, UserEntity>();

    public InMemoryUserRepository()
    {
        var userId = new UserId(Guid.Parse("2f863dca-b5a4-457e-9138-04cc6ce261dd"));
        _userStore[userId] = new UserEntity(userId, "max", DateOnly.Parse("02-05-2003"), UserRole.Admin, Secret.Create("qwerty"));
    }

    public Task<UserEntity> CreateUser(string email, DateOnly birthDate, string password,
        CancellationToken cancellationToken)
    {
        var userId = UserId.New();

        if (FindByName(email) is not null)
        {
            throw new ArgumentException("User with this name already exists");
        }

        var entity = new UserEntity(userId, email, birthDate, UserRole.User, Secret.Create(password));

        _userStore[userId] = entity;

        return Task.FromResult(entity);
    }

    public Task<UserEntity?> FindByEmailPassword(string email, string password, CancellationToken cancellationToken)
    {
        var userWithName = FindByName(email);

        if (userWithName is null)
        {
            return Task.FromResult<UserEntity?>(null);
        }

        if (userWithName.Secret.VerifyPassword(password))
        {
            return Task.FromResult<UserEntity?>(userWithName);
        }

        return Task.FromResult<UserEntity?>(null);
    }

    public Task<UserEntity?> GetUser(UserId userId, CancellationToken cancellationToken)
    {
        if (_userStore.ContainsKey(userId))
        {
            return Task.FromResult<UserEntity?>(_userStore[userId]);
        }

        return Task.FromResult<UserEntity?>(null);
    }

    private UserEntity? FindByName(string email)
    {
        return _userStore.FirstOrDefault(kp => kp.Value.Email == email).Value;
    }
}