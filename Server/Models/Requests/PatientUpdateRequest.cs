using Server.Models.Entities;
using Server.Extensions.JsonConverters;
using System.Text.Json.Serialization;

namespace Server.Models.Requests
{
    public record PatientUpdateRequest(
        string BloodType,
        string Allergens
        )
    {
    }
}
