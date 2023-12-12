using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Server.Models.Entities
{
    [StronglyTypedId(jsonConverter: StronglyTypedIdJsonConverter.SystemTextJson)]
    public readonly partial struct PatientId
    {
    }

    public class PatientEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public PatientId PatientId { get; init; }

        [Required]
        //public UserEntity UserId { get; init; }

        //public DoctorEntity DoctorId { get; init; }

        public UserId UserId { get; init; }

        public DoctorId DoctorId { get; init; }

        public float Rating { get; set; }

        public string BloodType { get; set; }

        public string Allergens { get; set; }
    }
    internal class PatientIdConverter : ValueConverter<PatientId, Guid>
    {
        public PatientIdConverter() : base(u => u.Value, v => new PatientId(v))
        {
        }
    }
}
