using AutoMapper;
using Server.Models.Dtos;
using Server.Models.Dtos.Doctor;
using Server.Models.Entities;
using Server.Models.Requests;
using Server.Repositories;

namespace Server.Services
{
    public class DoctorService : IDoctorService
    {
        private readonly IUserRepository _userRepository;
        private readonly IDoctorRepository _doctorRepository;
        private readonly IPatientRepository _patientRepository;

        public DoctorService(IUserRepository userRepository, IDoctorRepository doctorRepository, IPatientRepository patientRepository)
        {
            _userRepository = userRepository;
            _doctorRepository = doctorRepository;
            _patientRepository = patientRepository;
        }

        public async Task<DoctorEntity> Create(DoctorCreateRequest doctor, CancellationToken cancellationToken)
        {
            var (UserId, Rating, Proffesion, Experince) = doctor;


            var user = await _userRepository.GetUser(UserId, cancellationToken);
            if(user == null)
            {
                throw new Exception("User doesnt exist");
            }

            var newDoctor = new DoctorEntity()
            {
                Rating = Rating,
                Proffesion = Proffesion,
                Experience = Experince,
                UserId = UserId,
                DoctorId = DoctorId.New()
            };

            var resultEntity = await _doctorRepository.Create(newDoctor, cancellationToken);
            return resultEntity;
        }

        public async Task<DoctorEntity> Delete(DoctorId id, CancellationToken cancellationToken)
        {
            var result = await _doctorRepository.Delete(id, cancellationToken);
            return result;
        }

        public async Task<DoctorEntity> Get(DoctorId id, CancellationToken cancellationToken)
        {
            var result = await _doctorRepository.Get(id, cancellationToken);
            return result;
        }

        public async Task<List<DoctorEntity>> GetAll(CancellationToken cancellationToken)
        {
            var result = await _doctorRepository.GetAll(cancellationToken);
            return result;
        }

        public async Task<DoctorEntity> Update(DoctorId id, DoctorUpdateRequest doctor, CancellationToken cancellationToken)
        {
            var (Rating, Proffesion, Experince) = doctor;
            var newDoctor = new DoctorEntity()
            {
                Rating = Rating,
                Proffesion = Proffesion,
                Experience = Experince,
            };

            var result = await _doctorRepository.Update(id, newDoctor, cancellationToken);
            return result;
        }

        public async Task<DoctorEntity?> GetByUserId(UserId userId, CancellationToken cancellationToken)
        {
            return await _doctorRepository.GetByUserId(userId, cancellationToken);
        }

        public async Task<DoctorEntityWithUserData?> GetAsUser(DoctorId doctorId, CancellationToken cancellationToken)
        {
            var doctor = await _doctorRepository.Get(doctorId, cancellationToken);
            
            if (doctor is null)
            {
                return null;
            }

            var user = await _userRepository.GetUser(doctor.UserId, cancellationToken);
            if (user is null)
            {
                return null;
            }

            return new DoctorEntityWithUserData(doctor, UserDataDto.FromEntity(user)!);
        }

        public async Task<DoctorEntityWithPatients?> GetByUserIdWithPatients(UserId id, CancellationToken cancellationToken)
        {
            var doctor = await _doctorRepository.GetByUserId(id, cancellationToken);
            if (doctor is null)
            {
                return null;
            }
            
            var patients = await _patientRepository.GetPatientsOfDoctor(doctor.DoctorId, cancellationToken);
            
            var patientsWithUserData = new List<PatientEntityWithUserInfo>();
            
            foreach (var patient in patients)
            {
                var user = await _userRepository.GetUser(patient.UserId, cancellationToken);
                if (user is null)
                {
                    return null;
                }
                
                patientsWithUserData.Add(new PatientEntityWithUserInfo(patient, UserDataDto.FromEntity(user)!));
            }
            
            return new DoctorEntityWithPatients(doctor, patientsWithUserData);
        }
    }
}
