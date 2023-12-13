using AutoMapper;
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

        public DoctorService(IUserRepository userRepository, IDoctorRepository doctorRepository)
        {
            _userRepository = userRepository;
            _doctorRepository = doctorRepository;
        }

        public async Task<DoctorEntity> Create(DoctorCreateRequest doctor, CancellationToken cancellationToken)
        {
            var (Email, Rating, Proffesion, Experince) = doctor;


            var user = await _userRepository.GetUser(Email, cancellationToken);
            if(user == null)
            {
                throw new Exception("No user with this email");
            }

            var newDoctor = new DoctorEntity()
            {
                Rating = Rating,
                Proffesion = Proffesion,
                Experience = Experince,
                UserId = user.UserId,
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
    }
}
