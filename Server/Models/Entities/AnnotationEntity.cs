using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Server.Models.Entities
{
    public class AnnotationEntity
    {
        [Key]
        [JsonIgnore]
        public int Id { get; set; }
        public AnalysisId AnalysisId { get; set; }
        public string NameOfProperty { get; set; } = string.Empty;
        public MessageEntity Message { get; set; } = null!;
    }
}
