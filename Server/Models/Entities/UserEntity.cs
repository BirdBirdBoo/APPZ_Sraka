﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Server.Extensions;

namespace Server.Models.Entities;

[StronglyTypedId(jsonConverter: StronglyTypedIdJsonConverter.SystemTextJson)]
public readonly partial struct UserId
{
}

public class UserEntity
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public UserId UserId { get; init; }

    public string Email { get; init; }

    [JsonConverter(typeof(DateOnlyConverter))]
    public DateOnly BirthDate { get; init; }

    public UserRole Role { get; init; }

    public Secret Secret { get; init; }

    public UserEntity(UserId userId, string email, DateOnly birthDate, UserRole role, Secret secret)
    {
        UserId = userId;
        Email = email;
        BirthDate = birthDate;
        Role = role;
        Secret = secret;
    }

    public void Deconstruct(out UserId userId, out string email, out DateOnly birthDate, out UserRole role,
        out Secret secret)
    {
        userId = UserId;
        email = Email;
        birthDate = BirthDate;
        role = Role;
        secret = Secret;
    }
}

public record Secret(byte[] Hash, string Salt)
{
    public bool VerifyPassword(string password)
    {
        var passwordHash = CreateHash(CreateSaltedPassword(password, Salt));

        return Hash.AsSpan().SequenceEqual(passwordHash);
    }

    public static Secret Create(string password)
    {
        var salt = Guid.NewGuid().ToString();
        return new Secret(CreateHash(CreateSaltedPassword(password, salt)).ToArray(), salt);
    }

    private static ReadOnlySpan<byte> CreateHash(ReadOnlySpan<byte> saltedPassword)
    {
        var hashSpan = new Span<byte>(new byte[256 / 8]);
        SHA256.HashData(saltedPassword, hashSpan);
        return hashSpan;
    }

    private static ReadOnlySpan<byte> CreateSaltedPassword(string password, string salt)
    {
        return Encoding.UTF8.GetBytes(password + "-" + salt).AsSpan();
    }
}

public enum UserRole
{
    User,
    Admin
}

// ReSharper disable once ClassNeverInstantiated.Global
internal class UserIdConverter : ValueConverter<UserId, Guid>
{
    public UserIdConverter() : base(u => u.Value, v => new UserId(v))
    {
    }
}

// ReSharper disable once ClassNeverInstantiated.Global
internal class SecretConverter : ValueConverter<Secret, string>
{
    public SecretConverter() : base(v => SecretToString(v), s => SecretFromString(s))
    {
    }

    private static string SecretToString(Secret secret)
    {
        var (hashBytes, salt) = secret;

        var saltBytes = Encoding.UTF8.GetBytes($":{salt}");

        return EncodingUtils.ToBase64(hashBytes, saltBytes);
    }

    private static Secret SecretFromString(string encodedSecret)
    {
        var allBytes = EncodingUtils.FromBase64(encodedSecret);

        var hashBytes = allBytes[..32];

        var saltBytes = allBytes[33..];

        return new Secret(hashBytes.ToArray(), Encoding.UTF8.GetString(saltBytes));
    }
}

internal class DateOnlyConverter : ValueConverter<DateOnly, DateTime>
{
    public DateOnlyConverter() : base(d => d.ToDateTime(new TimeOnly()), t => DateOnly.FromDateTime(t))
    {
    }
}