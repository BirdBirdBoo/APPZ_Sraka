using Microsoft.EntityFrameworkCore;
using Server.Contexts;
using Server.Models.Entities;
using Server.Repositories;

namespace Server.Services
{
    public class AnnotationService : IAnnotationService
    {
        private IMessageRepository _messageRepository;
        private QualityLifeDbContext _qualityLifeDbContext;

        public AnnotationService(QualityLifeDbContext dbContext, IMessageRepository messageRepository)
        {
            _qualityLifeDbContext = dbContext;
            _messageRepository = messageRepository;
        }
        public async Task<AnnotationEntity> Create(AnnotationEntity annotation, CancellationToken cancellationToken)
        {
            await _messageRepository.Create(annotation.Message, cancellationToken);
            var annotationCreated = _qualityLifeDbContext.Annotations.Add(annotation);
            await _qualityLifeDbContext.SaveChangesAsync();

            return annotationCreated.Entity;
        }

        public async Task<bool> Delete(int annotationId, CancellationToken cancellationToken)
        {
            var annotation = await _qualityLifeDbContext.Annotations.FirstOrDefaultAsync(a => a.Id == annotationId);
            if (annotation != null)
            {
                _qualityLifeDbContext.Annotations.Remove(annotation);
                await _qualityLifeDbContext.SaveChangesAsync(cancellationToken);
            }

            return annotation != null;
        }

        public async Task<AnnotationEntity> Get(int annotationId, CancellationToken cancellationToken)
        {
            var message = await _qualityLifeDbContext.Annotations.FirstOrDefaultAsync(m => m.Id == annotationId);

            return message!;
        }

        public async Task<AnnotationEntity[]> GetAllAnnotationsForAnalysis(AnalysisId analysisId, CancellationToken cancellationToken)
        {
            return await _qualityLifeDbContext.Annotations.Where(a => a.AnalysisId == analysisId).ToArrayAsync();
        }

        public IQueryable<AnnotationEntity> GetAllAnnotationsQueryable()
        {
            throw new NotImplementedException();
        }

        public async Task<AnnotationEntity> Update(AnnotationEntity annotationEntity, CancellationToken cancellationToken)
        {
            var annotation = await _qualityLifeDbContext.Annotations.FindAsync(annotationEntity.Id);
            if (annotation != null)
            {
                //var message = annotation.Message;
                //message.Text = annotation.Message.Text;
                //_qualityLifeDbContext.Messages.Update(message);

                _qualityLifeDbContext.Annotations.Update(annotationEntity);
                await _qualityLifeDbContext.SaveChangesAsync(cancellationToken);
            }


            return annotation!;
        }
    }
}
