using Microsoft.EntityFrameworkCore;
using Server.Models.Entities;

namespace Server.Contexts
{
    public class QualityLifeDbContext : DbContext
    {
        public QualityLifeDbContext(DbContextOptions<QualityLifeDbContext> options) : base(options) { }

        public DbSet<UserEntity> Users { get; set; } = null!;
        public DbSet<DoctorEntity> Doctors { get; set; } = null!;
        public DbSet<PatientEntity> Patients { get; set; } = null!;
        public DbSet<AnalysisEntity> Analyzes { get; set; } = null!;
        public DbSet<MessageEntity> Messages { get; set; } = null!;

        protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
        {
            base.ConfigureConventions(configurationBuilder);

            configurationBuilder.Properties<Secret>()
                                .HaveConversion<SecretConverter>();

            configurationBuilder.Properties<UserId>()
                                .HaveConversion<UserIdConverter>();
            
            configurationBuilder.Properties<DoctorId>()
                                .HaveConversion<DoctorIdConverter>();

            configurationBuilder.Properties<PatientId>()
                                .HaveConversion<PatientIdConverter>();

            configurationBuilder.Properties<AnalysisId>()
                    .HaveConversion<AnalysisIdConverter>();

            configurationBuilder.Properties<DateOnly>()
                                .HaveConversion<DateOnlyConverter>();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserEntity>().ToTable("Users");
            modelBuilder.Entity<DoctorEntity>().ToTable("Doctors");
            modelBuilder.Entity<PatientEntity>().ToTable("Patients");
            modelBuilder.Entity<AnalysisEntity>().ToTable("Analyzes");
            modelBuilder.Entity<MessageEntity>().ToTable("Messages");
        }
    }
}
