using Server.Models.Entities;

namespace Server.Repositories
{
    public interface IPatientRepository
    {
        Task<PatientEntity> Create(PatientEntity patient, CancellationToken cancellationToken);
        Task<PatientEntity> Delete(PatientId id, CancellationToken cancellationToken);
        Task<PatientEntity> Get(PatientId id, CancellationToken cancellationToken);
        Task<List<PatientEntity>> GetAll(CancellationToken cancellationToken);
        Task<PatientEntity> Update(PatientId id, PatientEntity patient, CancellationToken cancellationToken);

    }
}
