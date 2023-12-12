using Microsoft.EntityFrameworkCore;
using Server.Contexts;
using Server.Models.Entities;

namespace Server.Repositories;

public class DbUserRepository : IUserRepository
{
    private readonly QualityLifeDbContext _appDbContext;

    public DbUserRepository(QualityLifeDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    public async Task<UserEntity> CreateUser(string email, DateOnly birthDate, string password,
        string firstName, string lastName, string phoneNumber, CancellationToken cancellationToken)
    {
        var newEntity =
            _appDbContext.Users.Add(new UserEntity(UserId.New(), email, birthDate,  UserRole.Admin, Secret.Create(password), firstName, lastName, phoneNumber));

        await _appDbContext.SaveChangesAsync(cancellationToken);

        return newEntity.Entity;
    }

    public async Task<UserEntity?> GetUser(UserId id, CancellationToken cancellationToken)
    {
        return await _appDbContext.Users.FindAsync(new object?[] { id }, cancellationToken);
    }

    public async Task<UserEntity?> FindByEmailPassword(string email, string password, CancellationToken cancellationToken)
    {
        var userByEmail = await _appDbContext.Users.SingleOrDefaultAsync(u => u.Email == email, cancellationToken);

        if (cancellationToken.IsCancellationRequested || userByEmail is null)
        {
            return null;
        }

        return userByEmail.Secret.VerifyPassword(password) ? userByEmail : null;
    }
}