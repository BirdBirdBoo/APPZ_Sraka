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

        //public UserEntity UserId { get; init; }

        //public DoctorEntity DoctorId { get; init; }

        [Required]
        public UserId UserId { get; set; }

        public DoctorId DoctorId { get; set; }

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
