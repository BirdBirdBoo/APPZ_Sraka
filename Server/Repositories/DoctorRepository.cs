using Microsoft.EntityFrameworkCore;
using Server.Contexts;
using Server.Models.Entities;
using System;
using System.Numerics;

namespace Server.Repositories
{
    public class DoctorRepository : IDoctorRepository
    {
        private readonly QualityLifeDbContext _appDbContext;

        public DoctorRepository(QualityLifeDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }


        public async Task<DoctorEntity> Create(DoctorEntity doctor, CancellationToken cancellationToken)
        {
            _appDbContext.Doctors.Add(doctor);
            await _appDbContext.SaveChangesAsync(cancellationToken);
            return doctor;
        }

        public async Task<DoctorEntity> Delete(DoctorId id, CancellationToken cancellationToken)
        {
            var doctor = await _appDbContext.Doctors.FindAsync(id.Value);

            if (doctor != null)
            {
                _appDbContext.Doctors.Remove(doctor);
                await _appDbContext.SaveChangesAsync(cancellationToken);
            }

            return doctor;
        }

        public async Task<DoctorEntity> Get(DoctorId id, CancellationToken cancellationToken)
        {
            var doctor = await _appDbContext.Doctors.FindAsync(id.Value);

            if (doctor == null)
            {
                throw new Exception("Not found");
            }

            return doctor;
        }

        public async Task<List<DoctorEntity>> GetAll(CancellationToken cancellationToken)
        {
            var doctors = await _appDbContext.Doctors.ToListAsync(cancellationToken);

            return doctors;
        }

        public async Task<DoctorEntity> Update(DoctorId id, DoctorEntity updatedDoctor, CancellationToken cancellationToken)
        {
            var existingDoctor = await _appDbContext.Doctors.FindAsync(id.Value);

            if (existingDoctor == null)
            {
                return null;
            }

            existingDoctor.Rating = updatedDoctor.Rating;
            existingDoctor.Proffesion = updatedDoctor.Proffesion;
            existingDoctor.Experience = updatedDoctor.Experience;

            await _appDbContext.SaveChangesAsync(cancellationToken);

            return existingDoctor;
        }

    }
}
