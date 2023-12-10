using System.Text.Json.Serialization;
using Server.Models.Entities;

namespace Server.Models.Dtos;

public record LoginResponseDto(
    UserId UserId,
    string Token,
    [property: JsonConverter(typeof(JsonStringEnumConverter))]
    UserRole Role
);