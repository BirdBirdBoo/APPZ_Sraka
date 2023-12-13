using Microsoft.EntityFrameworkCore;
using Server.Contexts;
using Server.Models.Entities;

namespace Server.Repositories
{
    public class DbMessageRepository : IMessageRepository
    {
        private readonly QualityLifeDbContext _qualityLifeDbContext;
        public DbMessageRepository(QualityLifeDbContext qualityLifeDbContext)
        {
            _qualityLifeDbContext = qualityLifeDbContext;
        }
        public async Task<MessageEntity> Create(MessageEntity messageEntity, CancellationToken cancellationToken)
        {
            var message = _qualityLifeDbContext.Messages.Add(messageEntity);
            await _qualityLifeDbContext.SaveChangesAsync(cancellationToken);
            return message.Entity;
        }

        public async Task<bool> Delete(int messageId, CancellationToken cancellationToken)
        {
            var message = await _qualityLifeDbContext.Messages.FirstOrDefaultAsync(m => m.Id == messageId);
            if (message != null)
            {
                _qualityLifeDbContext.Messages.Remove(message);
                await _qualityLifeDbContext.SaveChangesAsync(cancellationToken);
            }

            return message != null;
        }

        public async Task<MessageEntity> Get(int messageId, CancellationToken cancellationToken)
        {
            var message = await _qualityLifeDbContext.Messages.FirstOrDefaultAsync(m => m.Id == messageId);

            return message!;
        }

        public IQueryable<MessageEntity> GetAllMessagesQueryable()
        {
            return _qualityLifeDbContext.Messages.Where(a => true);
        }

        public async Task<MessageEntity> Update(MessageEntity messageEntity, CancellationToken cancellationToken)
        {
            var message = await _qualityLifeDbContext.Messages.FirstOrDefaultAsync(m => m.Id == messageEntity.Id);
            if (message != null)
            {
                message.Text = messageEntity.Text;
                _qualityLifeDbContext.Messages.Update(message);
                await _qualityLifeDbContext.SaveChangesAsync(cancellationToken);
            }

            return message!;
        }
    }
}
