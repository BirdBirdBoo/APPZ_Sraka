namespace Server.Extensions;

public static class EncodingUtils
{
    public static string ToBase64(Span<byte> array1, Span<byte> array2)
    {
        var totalBytes = new Span<byte>(new byte[array1.Length + array2.Length]);

        array1.CopyTo(totalBytes);
        array2.CopyTo(totalBytes[array1.Length..]);

        return Convert.ToBase64String(totalBytes);
    }

    public static Span<byte> FromBase64(string base64)
    {
        return Convert.FromBase64String(base64);
    }
}