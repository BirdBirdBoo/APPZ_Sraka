using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Server.Contexts;
using Server.Models.Dtos;
using Server.Models.Entities;
using Server.Models.Requests;
using Server.Repositories;
using System.IO.Pipes;

namespace Server.Services
{
    public class AnnotationService : IAnnotationService
    {
        private IMessageRepository _messageRepository;
        private IUserService _userService;
        private QualityLifeDbContext _qualityLifeDbContext;

        public AnnotationService(QualityLifeDbContext dbContext, 
            IMessageRepository messageRepository, 
            IUserService userService)
        {
            _qualityLifeDbContext = dbContext;
            _messageRepository = messageRepository;
            _userService = userService;
        }
        public async Task<AnnotationEntity> Create(CreateAnnotationRequest request, CancellationToken cancellationToken)
        {
            var (message, annotation) = request;
            var analysis = await _qualityLifeDbContext.Analyzes
                .Include(a => a.Patient)
                .FirstOrDefaultAsync(a => a.AnalysisId == annotation.AnalysisId, cancellationToken);

            var messageCreated = await _messageRepository.Create(new MessageEntity()
            {
                MessageType = MessageType.Annotation,
                Send = DateTime.Now,
                Sender = message.Sender,
                Text = message.Text,
                Receiver = analysis!.Patient.UserId,
            }, cancellationToken);
            annotation.MessageId = messageCreated.Id;

            var annotationCreated = _qualityLifeDbContext.Annotations.Add(annotation);
            await _qualityLifeDbContext.SaveChangesAsync(cancellationToken);

            return annotationCreated.Entity;
        }

        public async Task<bool> Delete(int annotationId, CancellationToken cancellationToken)
        {
            var annotation = await _qualityLifeDbContext.Annotations.FirstOrDefaultAsync(a => a.Id == annotationId);
            var message = await _messageRepository.Get(annotation!.MessageId, cancellationToken);
            if (annotation != null)
            {
                _qualityLifeDbContext.Annotations.Remove(annotation);
                await _messageRepository.Delete(message.Id, cancellationToken);
                await _qualityLifeDbContext.SaveChangesAsync(cancellationToken);
            }

            return annotation != null;
        }

        public async Task<AnnotationEntity> Get(int annotationId, CancellationToken cancellationToken)
        {
            var message = await _qualityLifeDbContext.Annotations.FirstOrDefaultAsync(m => m.Id == annotationId, cancellationToken: cancellationToken);

            return message!;
        }

        public async Task<AnnotationDto[]> GetAllAnnotationsForAnalysis(AnalysisId analysisId, CancellationToken cancellationToken)
        {
            var annotationEntities = await _qualityLifeDbContext.Annotations
                .Where(a => a.AnalysisId == analysisId).ToArrayAsync(cancellationToken: cancellationToken);

            var annotationDtos = new List<AnnotationDto>();
            foreach (var a in annotationEntities)
            {
                var message = (await _messageRepository.Get(a.MessageId, cancellationToken));
                var sender = await _userService.GetUserInfo(message.Sender, cancellationToken);

                annotationDtos.Add(new AnnotationDto()
                {
                    AnalysisId = a.AnalysisId,
                    NameOfProperty = a.NameOfProperty,
                    Message = message.Text,
                    Author = $"{sender!.FirstName} {sender!.SecondName}"
                });
            }

            return annotationDtos.ToArray();
        }

        public IQueryable<AnnotationEntity> GetAllAnnotationsQueryable()
        {
            throw new NotImplementedException();
        }

        public async Task<AnalysisId> GetAnalysisIdByMessageId(int messageId, CancellationToken cancellationToken)
        {
            var annotation = await _qualityLifeDbContext.Annotations.FirstOrDefaultAsync(a => a.MessageId == messageId, cancellationToken);
            return annotation.AnalysisId;
        }

        public async Task<AnnotationEntity> Update(AnnotationEntity annotationEntity, CancellationToken cancellationToken)
        {
            var annotation = await _qualityLifeDbContext.Annotations.FindAsync(new object?[] { annotationEntity.Id }, cancellationToken: cancellationToken);
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
