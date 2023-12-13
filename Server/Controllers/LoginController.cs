using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Extensions;
using Server.Extensions.Swagger;
using Server.Models.Dtos;
using Server.Models.Entities;
using Server.Models.Requests;
using Server.Services;
using IAuthorizationService = Server.Services.IAuthorizationService;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LoginController : ControllerBase
{
    private readonly IAuthorizationService _authorizationService;
    private readonly ILogger<LoginController> _logger;
    private readonly IUserService _userService;
    private readonly IPatientService _patientService;
    private readonly IDoctorService _doctorService;

    public LoginController(ILogger<LoginController> logger,
                           IUserService userService,
                           IAuthorizationService authorizationService,
                           IPatientService patientService,
                           IDoctorService doctorService)
    {
        _logger = logger;
        _userService = userService;
        _authorizationService = authorizationService;
        _patientService = patientService;
        _doctorService = doctorService;
    }

    [HttpPost]
    [Route("auth")]
    [ProducesResponseType(typeof(LoginResponseNewDto), (int)HttpStatusCode.OK)]
    [AllowAnonymous]
    public async Task<IActionResult> Login(LoginRequest request, CancellationToken token)
    {
        if (await _userService.TryLogIn(request, token) is ({ } id, { } role))
        {
            return Ok(await ConstructComplicatedLoginResponseBecauseFrickSeparationAsync(id, role, token));
        }

        return Unauthorized("Email or password does not match");
    }

    [HttpPost]
    [Route("authToken")]
    [ProducesResponseType(typeof(LoginResponseDto), (int)HttpStatusCode.OK)]
    [Authorize]
    public async Task<IActionResult> LoginToken(CancellationToken token)
    {
        var userIdOption = HttpContext.User.GetId();

        if (userIdOption is not { } id)
        {
            return Unauthorized();
        }

        if (await _userService.GetUserInfo(id, token) is { } userInfo)
        {
            return Ok(await ConstructComplicatedLoginResponseBecauseFrickSeparationAsync(id, userInfo.Role, token));
        }

        return Unauthorized();
    }

    [HttpPost]
    [Route("register")]
    [ProducesResponseType(typeof(LoginResponseDto), (int)HttpStatusCode.OK)]
    [AllowAnonymous]
    public async Task<IActionResult> Register(RegisterRequest request, CancellationToken token)
    {
        _logger.LogTrace("Received register request: {Request}", request);

        try
        {
            var (id, role) = await _userService.RegisterUser(request, token);

            return Ok(new LoginResponseDto(id, CreateToken(id, role), role));
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Could not register");
            return Problem("User already exists");
        }
    }

    /// <summary>
    ///     Gets user info by id
    /// </summary>
    [HttpGet("getInfo")]
    [DefaultValue("userId", "\"2f863dca-b5a4-457e-9138-04cc6ce261dd\"")]
    [ProducesResponseType(typeof(UserDataDto), (int)HttpStatusCode.OK)]
    // [Authorize]
    public async Task<IActionResult> GetUserInfo(UserId userId, CancellationToken token)
    {
        var canAccessUserData = await HttpContext.User.CanAccessUserData(_authorizationService, userId, token);

        if (!canAccessUserData)
        {
            return Unauthorized();
        }

        var userData = await _userService.GetUserInfo(userId, token);

        return userData is not null ? Ok(userData) : Problem("Could not find a user with this id");
    }

    private string CreateToken(UserId id, UserRole role)
    {
        return _authorizationService.CreateJwtToken(id, role);
    }

    private async Task<LoginResponseNewDto> ConstructComplicatedLoginResponseBecauseFrickSeparationAsync(
        UserId id,
        UserRole role,
        CancellationToken cancellationToken)
    {
        var userAsPatient = await _patientService.GetByUserId(id, cancellationToken);
        DoctorEntityWithUserData? patientDoctor = null;

        if (userAsPatient is not null)
        {
            patientDoctor = await _doctorService.GetAsUser(userAsPatient.DoctorId, cancellationToken);
        }

        var userAsDoctor = await _doctorService.GetByUserIdWithPatients(id, cancellationToken);

        return new LoginResponseNewDto(
            UserId: id,
            Token: CreateToken(id, role),
            Role: role,
            UserData: await _userService.GetUserInfo(id, cancellationToken),
            PatientDoctorId: patientDoctor?.DoctorId,
            UserAsPatientId: userAsPatient?.PatientId,
            UserAsDoctorId: userAsDoctor?.DoctorId,
            PatientDoctorInfo: patientDoctor,
            UserAsPatientInfo: userAsPatient,
            UserAsDoctorInfo: userAsDoctor
        );
    }
}