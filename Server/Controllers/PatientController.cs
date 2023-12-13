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
    public class PatientController : ControllerBase
    {
        private readonly ILogger<LoginController> _logger;
        private readonly IPatientService _patientService;

        public PatientController(ILogger<LoginController> logger, IPatientService doctorService)
        {
            _logger = logger;
            _patientService = doctorService;
        }

        [HttpPost]
        [DefaultValue("DoctorId", "44E2F46C-3972-47C3-9812-B60C46835714")]
        [DefaultValue("UserId", "2F9E433F-B135-4597-804A-82849CD5F0E9")]

        public async Task<IActionResult> Create(PatientCreateRequest request, CancellationToken token)
        {
            var result = await _patientService.Create(request, token);
            return Ok(result);
        }

        [HttpPost]
        [DefaultValue("patientId", "00C81837-3327-4516-B4AD-F363147A4279")]
        public async Task<IActionResult> Delete(PatientId patientId, CancellationToken token)
        {
            var result = await _patientService.Delete(patientId, token);
            return Ok(result);
        }

        [HttpPost]
        [DefaultValue("patientId", "00C81837-3327-4516-B4AD-F363147A4279")]
        public async Task<IActionResult> Get(PatientId patientId, CancellationToken token)
        {
            var result = await _patientService.Get(patientId, token);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> GetAll(CancellationToken token)
        {
            var result = await _patientService.GetAll(token);
            return Ok(result);
        }

        [HttpPost]
        [DefaultValue("patientId", "00C81837-3327-4516-B4AD-F363147A4279")]
        public async Task<IActionResult> Update(PatientId patientId, PatientUpdateRequest request, CancellationToken token)
        {
            var result = await _patientService.Update(patientId, request, token);
            return Ok(result);
        }
    }
}
