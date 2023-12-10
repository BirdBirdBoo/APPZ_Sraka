using Microsoft.EntityFrameworkCore;
using Server.Models.Entities;

namespace Server.Contexts;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<UserEntity> Users { get; set; }
    public DbSet<ImageEntity> Images { get; set; }


    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
        base.ConfigureConventions(configurationBuilder);

        configurationBuilder.Properties<Secret>()
                            .HaveConversion<SecretConverter>();

        configurationBuilder.Properties<UserId>()
                            .HaveConversion<UserIdConverter>();

        configurationBuilder.Properties<DateOnly>()
                            .HaveConversion<DateOnlyConverter>();
        
        configurationBuilder.Properties<string[]>()
                            .HaveConversion<StringArrayConverter>();
        configurationBuilder.Properties<ImageId>()
                            .HaveConversion<ImageIdConverter>();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<UserEntity>().ToTable("Users");
        modelBuilder.Entity<ImageEntity>().ToTable("Images");
    }
}