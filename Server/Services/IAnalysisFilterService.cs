using Server.Models.Dtos;
using Server.Models.Requests;

namespace Server.Services
{
    public interface IAnalysisFilterService
    {
        Task<AnalyzesFilteredDto> Filter(AnalysisFilterRequest analysisFilterRequest, CancellationToken token);
    }
}
