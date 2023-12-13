using Server.Models.Dtos.Doctor;
using Server.Models.Entities;
using Server.Models.Requests;

namespace Server.Services
{
    public interface IPatientService
    {

        Task<PatientEntity> Create(PatientCreateRequest patient, CancellationToken cancellationToken);
        Task<PatientEntity> Delete(PatientId id, CancellationToken cancellationToken);
        Task<PatientEntity> Get(PatientId id, CancellationToken cancellationToken);
        Task<List<PatientEntity>> GetAll(CancellationToken cancellationToken);
        Task<PatientEntity> Update(PatientId id, PatientUpdateRequest patient, CancellationToken cancellationToken);
    }
}
