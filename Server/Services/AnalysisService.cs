using Server.Models.Dtos;
using Server.Models.Entities;
using Server.Models.Requests;
using Server.Repositories;

namespace Server.Services
{
    public class AnalysisService : IAnalysisService
    {
        private readonly IAnalysisRepository _analysisRepository;
        private readonly ICriticalDefinerService _criticalDefinerService;
        public AnalysisService(IAnalysisRepository analysisRepository, ICriticalDefinerService criticalDefinerService)
        {
            _analysisRepository = analysisRepository;
            _criticalDefinerService = criticalDefinerService;
        }
        public async Task<AnalysisEntity> CreateAnalysis(NewAnalysisRequest analysisRequest, CancellationToken ct)
        {
            var (name, description, type, date, provider, data) = analysisRequest;
            var analysis = await _analysisRepository.CreateAnalysis(name, description, type, date, provider, data, ct);
            return analysis!;
        }

        public async Task<IEnumerable<AnalysisPreviewDto>> GetAllAnalyzes(CancellationToken ct)
        {
            return await _analysisRepository.GetAllAnalyzes(ct);
        }

        public async Task<IEnumerable<AnalysisDto>> GetAnalysis(AnalysisId analysisId, CancellationToken ct)
        {
            var analysis = await _analysisRepository.GetAnalysis(analysisId, ct);
            return _criticalDefinerService.Define(analysis!);
        }
    }
}
