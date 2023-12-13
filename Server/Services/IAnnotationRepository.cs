using Server.Models.Entities;

namespace Server.Services;

public interface IAnnotationService
{
    Task<AnnotationEntity> Create(AnnotationEntity annotation, CancellationToken cancellationToken);
    Task<AnnotationEntity> Get(int annotationId, CancellationToken cancellationToken);
    Task<AnnotationEntity> Update(AnnotationEntity annotation, CancellationToken cancellationToken);
    Task<bool> Delete(int annotationId, CancellationToken cancellationToken);
    IQueryable<AnnotationEntity> GetAllAnnotationsQueryable();
    Task<AnnotationEntity[]> GetAllAnnotationsForAnalysis(AnalysisId analysisId, CancellationToken cancellationToken);
}
