using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Models.Dtos;
using Server.Models.Dtos.Doctor;
using Server.Models.Requests;
using Server.Services;
using System.Net;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DoctorController : ControllerBase
    {
        private readonly ILogger<LoginController> _logger;
        //private readonly IUserService _userService;
        private readonly IDoctorService _doctorService;

        public DoctorController(ILogger<LoginController> logger, IDoctorService doctorService)
        {
            _logger = logger;
            _doctorService = doctorService;
        }

        [HttpPost]
        //[Route("auth")]
        //[ProducesResponseType(typeof(LoginResponseDto), (int)HttpStatusCode.OK)]
        //[AllowAnonymous]
        public async Task<IActionResult> Create(DoctorDto request, CancellationToken token)
        {
            var result = await _doctorService.Create(request, token);
            return Ok(result);
        }
    }
}
