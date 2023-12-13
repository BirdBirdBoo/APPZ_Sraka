using Server.Models.Entities;
using Server.Extensions.JsonConverters;
using System.Text.Json.Serialization;

namespace Server.Models.Requests
{
    public record DoctorCreateRequest(
        string Email,
        float Rating,
        string Proffesion,
        float Experience
        )
    {
    }
}
