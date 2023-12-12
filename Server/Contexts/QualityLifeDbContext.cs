﻿using Microsoft.EntityFrameworkCore;
using Server.Models.Entities;
using static System.Net.Mime.MediaTypeNames;

namespace Server.Contexts
{
    public class QualityLifeDbContext : DbContext
    {
        public QualityLifeDbContext(DbContextOptions<QualityLifeDbContext> options) : base(options) { }

        public DbSet<UserEntity> Users { get; set; }
        public DbSet<DoctorEntity> Doctors { get; set; }
        public DbSet<PatientEntity> Patients { get; set; }

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

            configurationBuilder.Properties<DateOnly>()
                                .HaveConversion<DateOnlyConverter>();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserEntity>().ToTable("Users");
            modelBuilder.Entity<DoctorEntity>().ToTable("Doctors");
            modelBuilder.Entity<PatientEntity>().ToTable("Patients");
        }
    }
}
