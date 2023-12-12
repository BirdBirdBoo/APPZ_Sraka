using Server.Models.Dtos.Doctor;
using Server.Models.Entities;

namespace Server.Services
{
    public interface IDoctorService
    {

        Task<DoctorDto> Create(DoctorDto doctor, CancellationToken cancellationToken);
        Task<DoctorDto> Delete(DoctorId id, CancellationToken cancellationToken);
        Task<DoctorDto> Get(DoctorId id, CancellationToken cancellationToken);
        Task<List<DoctorDto>> GetAll(CancellationToken cancellationToken);
        Task<DoctorDto> Update(DoctorId id, DoctorDto doctor, CancellationToken cancellationToken);
    }
}
