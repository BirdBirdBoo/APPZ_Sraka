using Server.Models.Dtos;
using Server.Models.Entities;
using Server.Models.Requests;
using Server.Repositories;

namespace Server.Services;

internal class ImageService : IImageService
{
    private readonly IImageRepository _imageRepository;

    public ImageService(IImageRepository imageRepository)
    {
        _imageRepository = imageRepository;
    }

    public async Task<ImageDto> CreateImage(NewImageRequest imageData, CancellationToken ct)
    {
        var (title, url, tags) = imageData;

        var imageEntity = await _imageRepository.CreateImage(title, url, tags, ct);
        
        return ImageDto.FromEntity(imageEntity)!;
    }

    public async Task<ImageDto?> UpdateImage(UpdateImageRequest imageRequest, CancellationToken ct)
    {
        var (id, title, url, tags) = imageRequest;

        var updatedImage = await _imageRepository.UpdateImage(id, title, url, tags, ct);

        return ImageDto.FromEntity(updatedImage);
    }

    public async Task<ImageArrayDto> GetAllImages(CancellationToken ct)
    {
        var entities = await _imageRepository.GetImages(ct);

        return new ImageArrayDto(entities.Select(ImageDto.FromEntity)!);
    }

    public async Task<bool> DeleteImage(ImageId imageId, CancellationToken ct)
    {
        return await _imageRepository.DeleteImage(imageId, ct);
    }
}