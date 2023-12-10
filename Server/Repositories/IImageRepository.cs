using Server.Models.Entities;

namespace Server.Repositories;

public interface IImageRepository
{
    Task<ImageEntity> CreateImage(string title, string url, string[] tags, CancellationToken ct);

    Task<IEnumerable<ImageEntity>> GetImages(CancellationToken ct);

    Task<ImageEntity?> UpdateImage(ImageId id, string title, string url, string[] tags, CancellationToken ct);

    Task<bool> DeleteImage(ImageId id, CancellationToken ct);
}