using Microsoft.EntityFrameworkCore;
using Server.Models.Entities;
using Server.Models.Requests;
using Server.Repositories;

namespace Server.Services
{
    public class MessageService : IMessageService
    {
        private readonly IMessageRepository _messageRepository;
        private readonly IUserRepository _userRepository;
        public MessageService(IMessageRepository messageRepository, IUserRepository userRepository)
        {
            _messageRepository = messageRepository;
            _userRepository = userRepository;
        }
        public async Task<MessageEntity[]> GetAllMessagesInChat(GetAllChatRequest getAllChatRequest, CancellationToken cancellationToken)
        {
            var (requester, interlocutor) = getAllChatRequest;
            var allMessages = _messageRepository.GetAllMessagesQueryable();
            return await allMessages
                .Where(m => m.Sender == requester && m.Receiver == interlocutor 
                || m.Receiver == requester && m.Sender == interlocutor)
                .OrderBy(m => m.Send).ToArrayAsync(cancellationToken);
        }

        public async Task Send(SendMessageRequest sendMessageRequest, CancellationToken ct)
        {
            var (sender, receiver, messageType, text) = sendMessageRequest;
            var senderUser = await _userRepository.GetUser(sender, ct);
            var receiverUser = await _userRepository.GetUser(receiver, ct);

            if(senderUser == null || receiverUser == null)
            {
                throw new InvalidOperationException("Sender or receiver does not exist");
            }

            await _messageRepository.Create(new MessageEntity()
            {
                Text = text,
                Sender = sender,
                Receiver = receiver,
                MessageType = messageType,
                Send = DateTime.Now
            }, ct);
        }
    }
}
