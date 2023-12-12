using Server.Extensions.JsonConverters;
using Server.Models.Entities;
using System.Text.Json.Serialization;

namespace Server.Models.Dtos.Doctor
{
    public record DoctorDto(
        UserId UserId,
        DoctorId DoctorId,
        string Email,
        [property: JsonConverter(typeof(JsonDateOnlyConverter))]
        DateOnly DateOfBirth,
        [property: JsonConverter(typeof(JsonStringEnumConverter))]
        UserRole Role,
        string FirstName,
        string SecondName,
        string PhoneNumber,
        float Rating,
        string Proffesion, 
        float Experience
        )
    {
        
    }
}
