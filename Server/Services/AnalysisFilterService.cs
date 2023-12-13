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
        private ICriticalDefinerService _criticalDefinerService;
        public AnalysisFilterService(IAnalysisRepository analysisRepository, ICriticalDefinerService criticalDefinerService)
        {
            _analysisRepository = analysisRepository;
            _criticalDefinerService = criticalDefinerService;
        }

        public async Task<IEnumerable<AnalysisEntity>> Filter(AnalysisFilterRequest analysisFilterRequest, CancellationToken token)
        {
            var allAnalyzes = _analysisRepository.GetAllAnalyzesQueryable();
            allAnalyzes
                //todo
                //.FilterByPatient(analysisFilterRequest)
                .FilterByName(analysisFilterRequest)
                .FilterByDate(analysisFilterRequest)
                .FilterByType(analysisFilterRequest)
                .OrderByDate(analysisFilterRequest)
                .SelectOnlyBeyondNorm(analysisFilterRequest, _criticalDefinerService);

            throw new NotImplementedException();

            return await allAnalyzes.ToListAsync();
        }
    }
}
