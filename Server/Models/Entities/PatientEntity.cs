using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Server.Models.Dtos;

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

        public string BloodType { get; set; }

        public string Allergens { get; set; }
        
        public void Deconstruct(out PatientId patientId, out UserId userId, out DoctorId doctorId, out string bloodType, out string allergens)
        {
            patientId = PatientId;
            userId = UserId;
            doctorId = DoctorId;
            bloodType = BloodType;
            allergens = Allergens;
        }
    }
    
    public class PatientEntityWithUserInfo
    {
        public PatientEntityWithUserInfo(PatientEntity patient, UserDataDto user)
        {
            (PatientId, UserId, DoctorId, BloodType, Allergens) = patient;
            UserData = user;
        }

        public PatientId PatientId { get; init; }

        [Required]
        public UserId UserId { get; set; }

        public DoctorId DoctorId { get; set; }

        public string BloodType { get; set; }

        public string Allergens { get; set; }

        public UserDataDto UserData { get; set; }

        public void Deconstruct(out PatientId patientId, out UserId userId, out DoctorId doctorId, out string bloodType, out string allergens, out UserDataDto userData)
        {
            patientId = PatientId;
            userId = UserId;
            doctorId = DoctorId;
            bloodType = BloodType;
            allergens = Allergens;
            userData = UserData;
        }
    }
    
    internal class PatientIdConverter : ValueConverter<PatientId, Guid>
    {
        public PatientIdConverter() : base(u => u.Value, v => new PatientId(v))
        {
        }
    }
}
