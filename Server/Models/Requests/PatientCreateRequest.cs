using Server.Models.Entities;
using Server.Extensions.JsonConverters;
using System.Text.Json.Serialization;

namespace Server.Models.Requests
{
    public record PatientCreateRequest(
        DoctorId DoctorId,
        UserId UserId,
        string BloodType,
        string Allergens
        )
    {
    }
}
