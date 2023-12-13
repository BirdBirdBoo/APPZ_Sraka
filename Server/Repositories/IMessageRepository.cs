using Server.Models.Entities;

namespace Server.Repositories;

public interface IMessageRepository
{
    Task<MessageEntity> Create(MessageEntity messageEntity, CancellationToken cancellationToken);
    Task<MessageEntity> Get(int messageId, CancellationToken cancellationToken);
    Task<MessageEntity> Update(MessageEntity messageEntity, CancellationToken cancellationToken);
    Task<bool> Delete(int messageId, CancellationToken cancellationToken);
    IQueryable<MessageEntity> GetAllMessagesQueryable();
}
