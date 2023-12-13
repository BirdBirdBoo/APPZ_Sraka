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

        public UserId UserId { get; set; }

        public float Rating { get; set; }

        public string Proffesion { get; set; }
        
        public float Experience { get; set; }

    }

    internal class DoctorIdConverter : ValueConverter<DoctorId, Guid>
    {
        public DoctorIdConverter() : base(u => u.Value, v => new DoctorId(v))
        {
        }
    }
}
