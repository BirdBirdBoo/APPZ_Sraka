using Server.Models.Dtos;
using Server.Models.Entities;
using Server.Models.Requests;
using Server.Repositories;

namespace Server.Services
{
    public class AnalysisService : IAnalysisService
    {
        private readonly IAnalysisRepository _analysisRepository;
        public AnalysisService(IAnalysisRepository analysisRepository) 
        {
            _analysisRepository = analysisRepository;
        }
        public async Task<AnalysisEntity> CreateAnalysis(NewAnalysisRequest analysisRequest, CancellationToken ct)
        {
            var (name, description, type, date, provider, data) = analysisRequest;
            var analysis = await _analysisRepository.CreateAnalysis(name, description, type, date, provider, data, ct);
            return analysis!;
        }

        public async Task<AnalysisArrayDto> GetAllAnalyzes(CancellationToken ct)
        {
            return new AnalysisArrayDto(await _analysisRepository.GetAllAnalyzes(ct));
        }

        public async Task<AnalysisEntity> GetAnalysis(AnalysisId analysisId, CancellationToken ct)
        {
            return await _analysisRepository.GetAnalysis(analysisId, ct);
        }
    }
}
