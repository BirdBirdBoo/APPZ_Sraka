using Server.Models.Dtos.Doctor;
using Server.Models.Entities;
using Server.Models.Requests;

namespace Server.Services
{
    public interface IDoctorService
    {

        Task<DoctorEntity> Create(DoctorCreateRequest doctor, CancellationToken cancellationToken);
        Task<DoctorEntity> Delete(DoctorId id, CancellationToken cancellationToken);
        Task<DoctorEntity> Get(DoctorId id, CancellationToken cancellationToken);
        Task<List<DoctorEntity>> GetAll(CancellationToken cancellationToken);
        Task<DoctorEntity> Update(DoctorId id, DoctorUpdateRequest doctor, CancellationToken cancellationToken);
    }
}
