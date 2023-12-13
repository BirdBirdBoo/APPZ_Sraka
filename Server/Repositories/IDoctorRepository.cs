using Server.Models.Entities;

namespace Server.Repositories
{
    public interface IDoctorRepository
    {
        Task<DoctorEntity> Create(DoctorEntity doctor, CancellationToken cancellationToken);
        Task<DoctorEntity> Delete(DoctorId id, CancellationToken cancellationToken);
        Task<DoctorEntity> Get(DoctorId id, CancellationToken cancellationToken);
        Task<List<DoctorEntity>> GetAll(CancellationToken cancellationToken);
        Task<DoctorEntity> Update(DoctorId id, DoctorEntity doctor, CancellationToken cancellationToken);

    }
}
