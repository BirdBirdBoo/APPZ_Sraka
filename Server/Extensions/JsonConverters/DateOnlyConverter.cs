using System.Text.Json;
using System.Text.Json.Serialization;

namespace Server.Extensions.JsonConverters;

internal class JsonDateOnlyConverter : JsonConverter<DateOnly>
{
    private const string DateFormat = "dd-MM-yyyy";

    public override DateOnly Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        if (reader.GetString() is not { } unparsedDate)
        {
            throw new JsonException("Expected a string to convert");
        }

        try
        {
            return DateOnly.Parse(unparsedDate);
        }
        catch (FormatException e)
        {
            throw new JsonException("Could not parse string date", e);
        }
    }

    public override void Write(Utf8JsonWriter writer, DateOnly value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString(DateFormat));
    }
}