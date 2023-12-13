using Microsoft.AspNetCore.Mvc;
using Server.Models.Entities;
using Server.Services;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AnnotationsController : ControllerBase
    {
        private IAnnotationService _annotationService;

        public AnnotationsController(IAnnotationService annotationService)
        {
            _annotationService = annotationService;
        }

        [HttpPost]
        [Route("create")]
        //[Authorize]
        public async Task<IActionResult> CreateNewAnalysis(AnnotationEntity annotationEntity, CancellationToken token)
        {
            var annotation = await _annotationService.Create(annotationEntity, token);

            return Ok(annotation);
        }

        [HttpGet]
        [Route("get")]
        //[Authorize]
        public async Task<IActionResult> GetAnalysis(int annotationId, CancellationToken token)
        {
            var annotation = await _annotationService.Get(annotationId, token);

            return Ok(annotation);
        }

        [HttpGet]
        [Route("getAllAnnotations")]
        //[Authorize]
        public async Task<IActionResult> GetAllAnnotationsForAnalysis(AnalysisId analysisId, CancellationToken token)
        {
            AnnotationEntity[] annotations = await _annotationService.GetAllAnnotationsForAnalysis(analysisId, token);

            return Ok(annotations);
        }

        [HttpDelete]
        //[Authorize]
        public async Task<IActionResult> Delete(int annotationId, CancellationToken token)
        {
            var result = await _annotationService.Delete(annotationId, token);
            return result ? Ok("Annotation was deleted") : Problem("Occured error during deletion");
        }

        [HttpPatch]
        //[Authorize]
        public async Task<IActionResult> Update(AnnotationEntity annotationEntity, CancellationToken token)
        {
            await _annotationService.Update(annotationEntity, token);
            return Ok();
        }
    }
}
