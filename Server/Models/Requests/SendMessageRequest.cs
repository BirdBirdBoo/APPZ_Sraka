using Server.Models.Entities;

namespace Server.Models.Requests
{
    public record SendMessageRequest(UserId sender, UserId receiver, MessageType messageType, string text);
}
