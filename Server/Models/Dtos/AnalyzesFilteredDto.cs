using Server.Models.Entities;

namespace Server.Models.Dtos
{
    public record AnalyzesFilteredDto(IEnumerable<AnalysisPreviewDto> analysisPreviews,
        IEnumerable<IEnumerable<AnalysisDto>> analysisProps);
}
