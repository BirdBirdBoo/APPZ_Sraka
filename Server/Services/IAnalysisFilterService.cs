using Server.Models.Entities;
using Server.Models.Requests;

namespace Server.Services
{
    public interface IAnalysisFilterService
    {
        Task<IEnumerable<AnalysisEntity>> Filter(AnalysisFilterRequest analysisFilterRequest, CancellationToken token);
    }
}
