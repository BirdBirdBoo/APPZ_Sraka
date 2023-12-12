using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Server.Extensions.JsonConverters;
using Server.Models.Entities;

namespace Server.Models.Dtos;

public record UserDataDto(
    UserId UserId,
    string Email,
    [property: JsonConverter(typeof(JsonDateOnlyConverter))]
    DateOnly DateOfBirth,
    [property: JsonConverter(typeof(JsonStringEnumConverter))]
    UserRole Role,
    string FirstName,
    string SecondName,
    string PhoneNumber
    )

{
    public static UserDataDto? FromEntity(UserEntity? userEntity)
    {
        if (userEntity is null)
        {
            return null;
        }

        var (id, email, dateOfBirth, role, _, firstName, secondName, phoneNumber) = userEntity;
        return new UserDataDto(id, email, dateOfBirth, role, firstName, secondName, phoneNumber);
    }
}