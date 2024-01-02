using Domain.Models;
using Domain.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using WEBAPI.Services;

namespace WEBAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly UserManager<IdentityUser> _userManager;

        public AuthController(IAuthService authService, UserManager<IdentityUser> userManager)
        {
            _authService = authService;
            _userManager = userManager;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> RegisterUser(LoginUser user)
        {
            return await _authService.RegisterUser(user) ? Ok("Successfuly done") : BadRequest("Something went worng");
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginUser user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            if (await _authService.Login(user))
            {
                string tokenString = _authService.GenerateTokenString(user);
                return Ok(tokenString);
            }
            return BadRequest();
        }
        [HttpPost("Logout")]

        public IActionResult Logout()
        {
            _ = User.FindFirstValue(ClaimTypes.Email);


            return Ok("Logout successful");
        }

        [HttpGet("GetAllUsers")]

        public async Task<IActionResult> GetAllUsers()
        {
            List<IdentityUser> users = await _userManager.Users.ToListAsync();

            IEnumerable<LoginViewModel> userViewModels = users.Select(user => new LoginViewModel
            {
                Password = user.Id,
                Email = user.UserName,
            });

            return Ok(userViewModels);
        }


    }
}
