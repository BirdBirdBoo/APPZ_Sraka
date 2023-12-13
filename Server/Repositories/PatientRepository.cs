using Microsoft.EntityFrameworkCore;
using Server.Contexts;
using Server.Models.Entities;

namespace Server.Repositories
{
    public class PatientRepository : IPatientRepository
    {
        private readonly QualityLifeDbContext _appDbContext;

        public PatientRepository(QualityLifeDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<PatientEntity> Create(PatientEntity patient, CancellationToken cancellationToken)
        {
            _appDbContext.Patients.Add(patient);
            await _appDbContext.SaveChangesAsync(cancellationToken);
            return patient;
        }

        public async Task<PatientEntity> Delete(PatientId id, CancellationToken cancellationToken)
        {
            var patient = await _appDbContext.Patients.FirstOrDefaultAsync(x => x.PatientId == id);

            if (patient != null)
            {
                _appDbContext.Patients.Remove(patient);
                await _appDbContext.SaveChangesAsync(cancellationToken);
            }

            return patient;
        }

        public async Task<PatientEntity> Get(PatientId id, CancellationToken cancellationToken)
        {
            var patient = await _appDbContext.Patients.FirstOrDefaultAsync(x => x.PatientId == id);

            if (patient == null)
            {
                throw new Exception("Not found");
            }

            return patient;
        }

        public async Task<List<PatientEntity>> GetAll(CancellationToken cancellationToken)
        {
            var patients = await _appDbContext.Patients.ToListAsync(cancellationToken);

            return patients;
        }

        public async Task<PatientEntity> Update(PatientId id,
                                                PatientEntity updatedPatient,
                                                CancellationToken cancellationToken)
        {
            var existingPatient = await _appDbContext.Patients.FirstOrDefaultAsync(x => x.PatientId == id);

            if (existingPatient == null)
            {
                return null;
            }

            existingPatient.BloodType = updatedPatient.BloodType;
            existingPatient.Allergens = updatedPatient.Allergens;

            await _appDbContext.SaveChangesAsync(cancellationToken);

            return existingPatient;
        }

        public async Task<PatientEntity?> GetByUserId(UserId userId, CancellationToken cancellationToken)
        {
            var existingPatient =
                await _appDbContext.Patients.FirstOrDefaultAsync(x => x.UserId == userId,
                                                                 cancellationToken: cancellationToken);

            return existingPatient;
        }
    }
}