using AutoMapper;
using Server.Models.Dtos.Doctor;
using Server.Models.Entities;
using Server.Repositories;

namespace Server.Services
{
    public class DoctorService : IDoctorService
    {
        private readonly IUserRepository _userRepository;
        private readonly IDoctorRepository _doctorRepository;
        private readonly IMapper _mapper;

        public DoctorService(IUserRepository userRepository, IDoctorRepository doctorRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _doctorRepository = doctorRepository;
            _mapper = mapper;
        }

        public async Task<DoctorDto> Create(DoctorDto doctor, CancellationToken cancellationToken)
        {
            var resultEntity = await _doctorRepository.Create(_mapper.Map<DoctorEntity>(doctor), cancellationToken);
            var resultDto = _mapper.Map<DoctorDto>(resultEntity);
            return resultDto;
        }

        public Task<DoctorDto> Delete(DoctorId id, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<DoctorDto> Get(DoctorId id, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<List<DoctorDto>> GetAll(CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<DoctorDto> Update(DoctorId id, DoctorDto doctor, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
