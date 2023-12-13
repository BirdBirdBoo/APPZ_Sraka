using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Models.Dtos;
using Server.Models.Dtos.Doctor;
using Server.Extensions;
using Server.Extensions.Swagger;
using Server.Models.Entities;
using Server.Models.Requests;
using Server.Services;
using System.Net;
using Microsoft.OpenApi.Any;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class DoctorController : ControllerBase
    {
        private readonly ILogger<LoginController> _logger;
        private readonly IDoctorService _doctorService;

        public DoctorController(ILogger<LoginController> logger, IDoctorService doctorService)
        {
            _logger = logger;
            _doctorService = doctorService;
        }

        [HttpPost]
        public async Task<IActionResult> Create(DoctorCreateRequest request, CancellationToken token)
        {
            try
            {
                var result = await _doctorService.Create(request, token);
                return Ok(result);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        [DefaultValue("doctorId", "44E2F46C-3972-47C3-9812-B60C46835714")]
        public async Task<IActionResult> Delete(DoctorId doctorId, CancellationToken token)
        {
            try
            {
                var result = await _doctorService.Delete(doctorId, token);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        [DefaultValue("doctorId", "44E2F46C-3972-47C3-9812-B60C46835714")]
        public async Task<IActionResult> Get(DoctorId doctorId, CancellationToken token)
        {
            try
            {
                var result = await _doctorService.Get(doctorId, token);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> GetAll(CancellationToken token)
        {
            try
            {
                var result = await _doctorService.GetAll(token);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        [DefaultValue("doctorId", "44E2F46C-3972-47C3-9812-B60C46835714")]
        public async Task<IActionResult> Update(DoctorId doctorId, DoctorUpdateRequest request, CancellationToken token)
        {
            try
            {
                var result = await _doctorService.Update(doctorId, request, token);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
