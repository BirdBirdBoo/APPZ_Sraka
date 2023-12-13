using Server.Models.Entities;

namespace Server.Models.Dtos
{
    public record AnalyzesFilteredDto(
        IEnumerable<AnalysisPreviewDto> analysisPreviews,
        Dictionary<AnalysisId, IEnumerable<AnalysisDto>> analysisAndProps);
}
