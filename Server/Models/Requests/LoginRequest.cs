namespace Server.Models.Requests;

public record LoginRequest(
    //[EmailAddress, Required]
    string Email,
    //[Password, Required]
    string Password
);