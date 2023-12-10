using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Server.Models.Entities;

namespace Server.Models.Dtos;

public record LoginTokenResponseDto(
    UserId UserId,
    [property: JsonConverter(typeof(JsonStringEnumConverter))]
    UserRole Role
);