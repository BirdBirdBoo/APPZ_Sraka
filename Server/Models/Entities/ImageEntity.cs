using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Server.Models.Entities;

[StronglyTypedId(jsonConverter: StronglyTypedIdJsonConverter.SystemTextJson)]
public readonly partial struct ImageId
{
}

public class ImageEntity
{
    public ImageEntity(ImageId id, string title, string url, string[] tags)
    {
        Id = id;
        Title = title;
        Url = url;
        Tags = tags;
    }

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public ImageId Id { get; set; }

    public string Title { get; set; }

    public string Url { get; set; }

    public string[] Tags { get; set; }

    public void Deconstruct(out ImageId id, out string title, out string url, out string[] tags)
    {
        id = Id;
        title = Title;
        url = Url;
        tags = Tags;
    }
}

// ReSharper disable once ClassNeverInstantiated.Global
internal class StringArrayConverter : ValueConverter<string[], string>
{
    public StringArrayConverter() : base(u => string.Join(' ', u),
        v => v.Split(' ', StringSplitOptions.RemoveEmptyEntries))
    {
    }
}

// ReSharper disable once ClassNeverInstantiated.Global
internal class ImageIdConverter : ValueConverter<ImageId, Guid>
{
    public ImageIdConverter() : base(u => u.Value, v => new ImageId(v))
    {
    }
}