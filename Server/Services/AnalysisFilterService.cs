using Microsoft.EntityFrameworkCore;
using Server.Extensions;
using Server.Models.Dtos;
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

        public async Task<AnalyzesFilteredDto> Filter(AnalysisFilterRequest analysisFilterRequest, CancellationToken token)
        {

            var allAnalyzes = _analysisRepository.GetAllAnalyzesQueryable();
            var result = await allAnalyzes
                //todo
                //.FilterByPatient(analysisFilterRequest)
                .FilterByName(analysisFilterRequest)
                .FilterByDate(analysisFilterRequest)
                .FilterByType(analysisFilterRequest)
                .OrderByDate(analysisFilterRequest)
                .SelectOnlyBeyondNorm(analysisFilterRequest, _criticalDefinerService);

            var analyzesFilteredDto = new AnalyzesFilteredDto(result.Item1, result.Item2!);
            return analyzesFilteredDto;
        }
    }
}
