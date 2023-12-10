using Server.Models.Dtos;
using Server.Models.Entities;
using Server.Models.Requests;

namespace Server.Services;

public interface IImageService
{
    Task<ImageDto> CreateImage(NewImageRequest imageData, CancellationToken ct);

    Task<ImageDto?> UpdateImage(UpdateImageRequest imageRequest, CancellationToken ct);

    Task<ImageArrayDto> GetAllImages(CancellationToken ct);

    Task<bool> DeleteImage(ImageId imageId, CancellationToken ct);
}