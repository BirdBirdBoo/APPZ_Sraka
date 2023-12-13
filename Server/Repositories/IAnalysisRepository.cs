using Server.Models.Dtos;
using Server.Models.Entities;

namespace Server.Repositories
{
    public interface IAnalysisRepository
    {
        Task<AnalysisEntity?> CreateAnalysis(string name, string description, string type, DateTime date, string provider, string data, CancellationToken cancellationToken);

        Task<AnalysisEntity?> GetAnalysis(AnalysisId id, CancellationToken cancellationToken);

        Task<IEnumerable<AnalysisPreviewDto>> GetAllAnalyzes(CancellationToken cancellationToken);
        IQueryable<AnalysisEntity> GetAllAnalyzesQueryable();
    }
}
