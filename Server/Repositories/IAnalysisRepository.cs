using Server.Models.Dtos;
using Server.Models.Entities;

namespace Server.Services;

public interface IAnalysisRepository
{
    Task<AnnotationEntity?> CreateAnalysis(PatientId patiendId, string name, string description, string type, DateTime date, string provider, string data, CancellationToken cancellationToken);

    Task<AnnotationEntity?> GetAnalysis(AnalysisId id, CancellationToken cancellationToken);

    Task<IEnumerable<AnalysisPreviewDto>> GetAllAnalyzes(CancellationToken cancellationToken);
    IQueryable<AnalysisEntity> GetAllAnalyzesQueryable();
}
