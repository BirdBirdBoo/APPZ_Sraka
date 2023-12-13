using Server.Models.Entities;

namespace Server.Models.Dtos;

public record AnalysisPreviewDto(
    AnalysisId analysisId, string name, string description, string type, DateTime date);
