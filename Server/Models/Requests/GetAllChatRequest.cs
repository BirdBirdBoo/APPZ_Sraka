using Server.Models.Entities;

namespace Server.Models.Requests
{
    public record GetAllChatRequest(UserId first, UserId second);
}
