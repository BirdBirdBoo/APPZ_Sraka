using Server.Models.Entities;

namespace Server.Models.Requests;

public record UpdateImageRequest(
    ImageId Id,
    string Title,
    string ImageUrl,
    string[] Tags
);