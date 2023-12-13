using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Models.Dtos;
using Server.Models.Entities;
using Server.Models.Requests;
using Server.Services;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AnalysisController : ControllerBase
{
    private IAnalysisService _analysisService;
    private IAnalysisFilterService _analysisFilterService;

    public AnalysisController(IAnalysisService analysisService, IAnalysisFilterService analysisFilterService)
    {
        _analysisService = analysisService;
        _analysisFilterService = analysisFilterService;
    }

    [HttpPost]
    [Route("create")]
    //[Authorize]
    public async Task<IActionResult> CreateNewAnalysis(NewAnalysisRequest request, CancellationToken token)
    {
        var analysis = await _analysisService.CreateAnalysis(request, token);

        return Ok(analysis);
    }

    [HttpGet]
    [Route("get")]
    //[Authorize]
    public async Task<IActionResult> GetAnalysis(AnalysisId id, CancellationToken token)
    {
        IEnumerable<AnalysisDto> analysis = await _analysisService.GetAnalysis(id, token);

        return Ok(analysis);
    }

    [HttpGet]
    [Route("getAnalyzes")]
    //[Authorize]
    public async Task<IActionResult> GetAllAnalyzes(CancellationToken token)
    {
        IEnumerable<AnalysisPreviewDto> analyzes = await _analysisService.GetAllAnalyzes(token);

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
