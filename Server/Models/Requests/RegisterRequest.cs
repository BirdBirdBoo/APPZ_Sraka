using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Server.Extensions.JsonConverters;

namespace Server.Models.Requests;

public record RegisterRequest(
    string Email,
    string Password,
    [Required] [property: JsonConverter(typeof(JsonDateOnlyConverter))]
    DateOnly BirthDate,
    string FirstName,
    string LastName,
    string PhoneNumber
) : LoginRequest(Email, Password);