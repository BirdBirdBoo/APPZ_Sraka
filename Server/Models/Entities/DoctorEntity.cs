using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Server.Models.Dtos;

namespace Server.Models.Entities;

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

    public void Deconstruct(out DoctorId doctorId, out UserId userId, out float rating, out string proffesion, out float experience)
    {
        doctorId = DoctorId;
        userId = UserId;
        rating = Rating;
        proffesion = Proffesion;
        experience = Experience;
    }
}   

public class DoctorEntityWithUserData
{
    public DoctorEntityWithUserData(DoctorEntity doctor, UserDataDto user)
    {
        (DoctorId, UserId, Rating, Proffesion, Experience) = doctor;
        UserData = user;
    }

    public DoctorId DoctorId { get; init; }

    public UserId UserId { get; set; }

    public float Rating { get; set; }

    public string Proffesion { get; set; }
        
    public float Experience { get; set; }

    public UserDataDto UserData { get; set; }

    public void Deconstruct(out DoctorId doctorId, out UserId userId, out float rating, out string proffesion, out float experience, out UserDataDto userData)
    {
        doctorId = DoctorId;
        userId = UserId;
        rating = Rating;
        proffesion = Proffesion;
        experience = Experience;
        userData = UserData;
    }
}

public class DoctorEntityWithPatients
{
    public DoctorEntityWithPatients(DoctorEntity doctor, List<PatientEntityWithUserInfo> patients)
    {
        (DoctorId, UserId, Rating, Proffesion, Experience) = doctor;
        Patients = patients;
    }

    public DoctorId DoctorId { get; init; }

    public UserId UserId { get; set; }

    public float Rating { get; set; }

    public string Proffesion { get; set; }
        
    public float Experience { get; set; }

    public List<PatientEntityWithUserInfo> Patients { get; set; }

    public void Deconstruct(out DoctorId doctorId, out UserId userId, out float rating, out string proffesion, out float experience, out List<PatientEntityWithUserInfo> patients)
    {
        doctorId = DoctorId;
        userId = UserId;
        rating = Rating;
        proffesion = Proffesion;
        experience = Experience;
        patients = Patients;
    }
}

internal class DoctorIdConverter : ValueConverter<DoctorId, Guid>
{
    public DoctorIdConverter() : base(u => u.Value, v => new DoctorId(v))
    {
    }
}