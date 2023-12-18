using Server.Models.Entities;

namespace Server.Models.Dtos
{
    public class AnnotationDto
    {
        public AnalysisId AnalysisId { get; set; }
        public string NameOfProperty { get; set; } = string.Empty;
        public string? Message { get; set; }
        public string? Author { get; set; }
    }
}
