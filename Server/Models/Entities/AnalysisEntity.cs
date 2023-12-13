using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Server.Models.Entities
{
    [StronglyTypedId(jsonConverter: StronglyTypedIdJsonConverter.SystemTextJson)]
    public readonly partial struct AnalysisId
    {
    }

    internal class AnalysisIdConverter : ValueConverter<AnalysisId, Guid>
    {
        public AnalysisIdConverter() : base(u => u.Value, v => new AnalysisId(v))
        {
        }
    }

    public class AnalysisEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public AnalysisId AnalysisId { get; init; }
        public PatientEntity Patient { get; init; } = null!;
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Type { get; set; }
        public DateTime Date { get; set; }
        public string? Provider { get; set; }
        public string? Data { get; set; }
    }
}
