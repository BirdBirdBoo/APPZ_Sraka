using Server.Models.Entities;
using Server.Models.Requests;

namespace Server.Services
{
    public interface IMessageService
    {
        Task Send(SendMessageRequest sendMessageRequest, CancellationToken cancellationToken);
        Task<MessageEntity[]> GetAllMessagesInChat(GetAllChatRequest getAllChatRequest, CancellationToken cancellationToken);
    }
}
