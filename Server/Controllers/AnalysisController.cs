using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Models.Dtos;
using Server.Models.Entities;
using Server.Models.Requests;
using Server.Repositories;
using Server.Services;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AnalysisController : ControllerBase
{
    private readonly IAnalysisService _analysisService;
    private readonly IAnalysisFilterService _analysisFilterService;
    private readonly IAnalysisRepository _analysisRepository;

    public AnalysisController(IAnalysisService analysisService, IAnalysisFilterService analysisFilterService, IAnalysisRepository analysisRepository)
    {
        _analysisService = analysisService;
        _analysisFilterService = analysisFilterService;
        _analysisRepository = analysisRepository;
    }

    [HttpPost]
    [Route("create")]
    //[Authorize]
    public async Task<IActionResult> CreateNewAnalysis(NewAnalysisRequest request, CancellationToken token)
    {
        var analysis = await _analysisService.Create(request, token);

        return Ok(analysis);
    }

    [HttpGet]
    [Route("get")]
    //[Authorize]
    public async Task<IActionResult> GetAnalysis(AnalysisId id, CancellationToken token)
    {
        IEnumerable<AnalysisDto> analysis = await _analysisService.Get(id, token);

        return Ok(analysis);
    }

    [HttpGet]
    [Route("getAnalysisPreview")]
    //[Authorize]
    public async Task<IActionResult> GetAnalysisPreview(AnalysisId id, CancellationToken token)
    {
        var analysis = await _analysisRepository.GetAnalysis(id, token);

        return Ok(analysis);
    }

    [HttpGet]
    [Route("getAnalyzes")]
    //[Authorize]
    public async Task<IActionResult> GetAllAnalyzes(PatientId patientId, CancellationToken token)
    {
        IEnumerable<AnalysisPreviewDto> analyzes = await _analysisService.GetAll(patientId, token);

        return Ok(analyzes);
    }

    [HttpPost]
    [Route("filter")]
    //[Authorize]
    public async Task<IActionResult> FilterAnalyzes(AnalysisFilterRequest request, CancellationToken token)
    {
        AnalyzesFilteredDto analyzesFiltered = await _analysisFilterService.Filter(request, token);

        return Ok(analyzesFiltered);
    }
}