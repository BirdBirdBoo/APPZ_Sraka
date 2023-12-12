using Microsoft.EntityFrameworkCore;
using Server.Extensions;
using Server.Models.Entities;
using Server.Models.Requests;
using Server.Repositories;

namespace Server.Services
{
    public class AnalysisFilterService : IAnalysisFilterService
    {
        private IAnalysisRepository _analysisRepository;
        public AnalysisFilterService(IAnalysisRepository analysisRepository)
        {
            _analysisRepository = analysisRepository;
        }

        public async Task<IEnumerable<AnalysisEntity>> Filter(AnalysisFilterRequest analysisFilterRequest, CancellationToken token)
        {
            var allAnalyzes = _analysisRepository.GetAllAnalyzesQueryable();
            allAnalyzes.FilterByName(analysisFilterRequest)
                .FilterByDate(analysisFilterRequest)
                .FilterByType(analysisFilterRequest)
                .SelectOnlyBeyondNorm(analysisFilterRequest)
                .OrderByDate(analysisFilterRequest);

            throw new NotImplementedException();

            return await allAnalyzes.ToListAsync();
        }
    }
}
