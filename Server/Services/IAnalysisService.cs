using Server.Models.Dtos;
using Server.Models.Entities;
using Server.Models.Requests;

namespace Server.Services
{
    public interface IAnalysisService
    {
        Task<AnalysisEntity> Create(NewAnalysisRequest analysisRequest, CancellationToken ct);
        Task<IEnumerable<AnalysisPreviewDto>> GetAll(PatientId patientId, CancellationToken ct);
        Task<IEnumerable<AnalysisDto>> Get(AnalysisId analysisId, CancellationToken ct);
    }
}
