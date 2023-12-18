using Microsoft.AspNetCore.Mvc;
using Server.Models.Dtos;
using Server.Models.Entities;
using Server.Models.Requests;
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
        public async Task<IActionResult> CreateNewAnalysis(CreateAnnotationRequest request, CancellationToken token)
        {
            var annotation = await _annotationService.Create(request, token);

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
        [Route("getAnalysisId")]
        //[Authorize]
        public async Task<IActionResult> GetAnalysisIdByMessageId(int messageId, CancellationToken token)
        {
            var result = await _annotationService.GetAnalysisIdByMessageId(messageId, token);

            return Ok(result);
        }

        [HttpGet]
        [Route("getAllAnnotations")]
        //[Authorize]
        public async Task<IActionResult> GetAllAnnotationsForAnalysis(AnalysisId analysisId, CancellationToken token)
        {
            AnnotationDto[] annotations = await _annotationService.GetAllAnnotationsForAnalysis(analysisId, token);

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
