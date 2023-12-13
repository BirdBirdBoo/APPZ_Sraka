using Server.Models.Entities;
using Server.Models.Requests;
using Server.Repositories;
using System.Numerics;

namespace Server.Services
{
    public class PatientService : IPatientService
    {

        private readonly IUserRepository _userRepository;
        private readonly IPatientRepository _patientRepository;

        public PatientService(IUserRepository userRepository, IPatientRepository patientRepository)
        {
            _userRepository = userRepository;
            _patientRepository = patientRepository;
        }

        public async Task<PatientEntity?> GetByUserId(UserId userId, CancellationToken cancellationToken)
        {
            return await _patientRepository.GetByUserId(userId, cancellationToken);
        }

        public async Task<PatientEntity> Create(PatientCreateRequest patient, CancellationToken cancellationToken)
        {
            //var (DoctorId, UserId, BloodType, Allergens) = patient;

            var newPatient = new PatientEntity()
            {
                DoctorId = patient.DoctorId,
                UserId = patient.UserId,
                BloodType = patient.BloodType,
                Allergens = patient.Allergens,
                PatientId = PatientId.New()
            };

            var resultEntity = await _patientRepository.Create(newPatient, cancellationToken);
            return resultEntity;
        }

        public async Task<PatientEntity> Delete(PatientId id, CancellationToken cancellationToken)
        {
            var result = await _patientRepository.Delete(id, cancellationToken);
            return result;
        }

        public async Task<PatientEntity> Get(PatientId id, CancellationToken cancellationToken)
        {
            var result = await _patientRepository.Get(id, cancellationToken);
            return result;
        }

        public async Task<List<PatientEntity>> GetAll(CancellationToken cancellationToken)
        {
            var result = await _patientRepository.GetAll(cancellationToken);
            return result;
        }

        public async Task<PatientEntity> Update(PatientId id, PatientUpdateRequest patient, CancellationToken cancellationToken)
        {
            var newPatient = new PatientEntity()
            {
                BloodType = patient.BloodType,
                Allergens = patient.Allergens
            };

            var result = await _patientRepository.Update(id, newPatient, cancellationToken);
            return result;
        }
    }
}
