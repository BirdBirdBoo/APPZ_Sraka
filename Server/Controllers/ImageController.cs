using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Models.Entities;
using Server.Models.Requests;
using Server.Services;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = nameof(UserRole.Admin))]
public class ImageController : ControllerBase
{
    private readonly IImageService _imageService;

    public ImageController(IImageService imageService)
    {
        _imageService = imageService;
    }

    [HttpGet("getImages")]
    [AllowAnonymous]
    public async Task<IActionResult> GetImages(CancellationToken ct)
    {
        var images = await _imageService.GetAllImages(ct);

        return Ok(images);
    }

    [HttpPost("new")]
    public async Task<IActionResult> NewImage(NewImageRequest newImageRequest, CancellationToken ct)
    {
        var newImage = await _imageService.CreateImage(newImageRequest, ct);

        return Ok(newImage);
    }

    [HttpDelete("delete")]
    public async Task<IActionResult> DeleteImage([Required, FromQuery(Name = "id")] ImageId imageId,
        CancellationToken ct)
    {
        var deleted = await _imageService.DeleteImage(imageId, ct);

        return deleted ? Ok() : NotFound();
    }

    [HttpPatch("update")]
    public async Task<IActionResult> UpdateImage(UpdateImageRequest updateImageRequest, CancellationToken ct)
    {
        var updatedImage = await _imageService.UpdateImage(updateImageRequest, ct);

        return updatedImage is {} ? Ok(updatedImage) : NotFound();
    }
}