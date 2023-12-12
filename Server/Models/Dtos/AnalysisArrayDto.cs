using Server.Models.Entities;

namespace Server.Models.Dtos;

public record AnalysisArrayDto(IEnumerable<AnalysisEntity> Analyses);