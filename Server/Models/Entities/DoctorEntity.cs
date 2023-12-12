using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Server.Models.Entities
{
    [StronglyTypedId(jsonConverter: StronglyTypedIdJsonConverter.SystemTextJson)]
    public readonly partial struct DoctorId
    {
    }
    public class DoctorEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public DoctorId DoctorId { get; init; }

        [Required]
        public UserId UserId { get; init; }

        public float Rating { get; init; }

        public string Proffesion { get; init; }
        
        public float Experience { get; init; }

    }

    internal class DoctorIdConverter : ValueConverter<DoctorId, Guid>
    {
        public DoctorIdConverter() : base(u => u.Value, v => new DoctorId(v))
        {
        }
    }
}
