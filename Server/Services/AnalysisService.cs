using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
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
        public async Task<AnalysisEntity> Create(NewAnalysisRequest analysisRequest, CancellationToken ct)
        {
            var (patiendId, name, description, type, date, provider, data) = analysisRequest;
            var analysis = await _analysisRepository.CreateAnalysis(patiendId, name, description, type, date, provider, JsonConvert.SerializeObject(data), ct);
            return analysis!;
        }

        public async Task<IEnumerable<AnalysisPreviewDto>> GetAll(CancellationToken ct)
        {
            return await _analysisRepository.GetAllAnalyzes(ct);
        }

        public async Task<IEnumerable<AnalysisDto>> Get(AnalysisId analysisId, CancellationToken ct)
        {
            var analysis = await _analysisRepository.GetAnalysis(analysisId, ct);
            return _criticalDefinerService.Define(analysis!);
        }
    }
}
