using System.ComponentModel.DataAnnotations;
using Server.Extensions;

namespace Server.DataAnnotations;

[AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Parameter)]
public class PasswordAttribute : ValidationAttribute
{
    public override bool IsValid(object? value)
    {
        if (value is not string password)
        {
            return false;
        }

        if (password.Length < 8)
        {
            return false;
        }

        var passwordCharacters = password.AsSpan();

        var containsBigLetter = passwordCharacters.Any(char.IsUpper);

        var containsDigit = passwordCharacters.Any(char.IsDigit);

        var containsSymbol = passwordCharacters.Any(c => !char.IsLetterOrDigit(c));

        return containsBigLetter && containsDigit && containsSymbol;
    }

    public override string FormatErrorMessage(string name)
    {
        return "Password should contain at least one big letter, digit and a symbol and be at least 8 characters long";
    }
}