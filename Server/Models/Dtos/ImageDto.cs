using Server.Models.Entities;

namespace Server.Models.Dtos;

public record ImageDto(ImageId Id, string Title, string ImageUrl, string[] Tags)
{
    public static ImageDto? FromEntity(ImageEntity? imageEntity)
    {
        if (imageEntity is null)
        {
            return null;
        }

        var (id, title, url, tags) = imageEntity;
        
        return new ImageDto(id, title, url, tags);
    }
}