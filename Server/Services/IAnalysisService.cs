using Server.Models.Dtos;
using Server.Models.Entities;
using Server.Models.Requests;

namespace Server.Services
{
    public interface IAnalysisService
    {
        Task<AnalysisEntity> CreateAnalysis(NewAnalysisRequest analysisRequest, CancellationToken ct);
        Task<AnalysisArrayDto> GetAllAnalyzes(CancellationToken ct);
        Task<AnalysisEntity> GetAnalysis(AnalysisId analysisId, CancellationToken ct);
    }
}
