namespace Server.Models.Requests;

public record NewImageRequest(
    string Title,
    string ImageUrl,
    string[] Tags
);