using Microsoft.AspNetCore.Mvc;
using Server.Models.Entities;
using Server.Repositories;

namespace Server.Controllers;


[ApiController]
[Route("api/[controller]")]
public class ChartsController : ControllerBase
{
    private IChartsRepository _chartsRepository;
    public ChartsController(IChartsRepository chartsRepository)
    {
        _chartsRepository = chartsRepository;
    }

    [HttpPost]
    [Route("create")]
    //[Authorize]
    public IActionResult Create(CreateChartRequest request, CancellationToken token)
    {
        var analysis = _chartsRepository.Create(request);

        return Ok(analysis);
    }

    [HttpGet]
    [Route("get")]
    //[Authorize]
    public IActionResult Get(int chartId, CancellationToken token)
    {
        var chart = _chartsRepository.Get(chartId);

        return Ok(chart);
    }

    [HttpGet]
    [Route("getAnalyzes")]
    //[Authorize]
    public IActionResult GetAll(PatientId patientId, CancellationToken token)
    {
        var charts = _chartsRepository.GetAllForPatient(patientId);

        return Ok(charts);
    }
}
