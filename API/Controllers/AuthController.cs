using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    [AllowAnonymous]
    public class AuthController : MainController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;
        private readonly DataContext _context;

        public AuthController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager,
            TokenService tokenService, DataContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _context = context;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDetails)
        {
            var user = await _userManager.FindByEmailAsync(loginDetails.Email);
            if (user == null) return Unauthorized();

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDetails.Password, false);

            if (result.Succeeded)
            {
                return CreateUserObject(user);
            }

            return Unauthorized();
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            // check if email is exists or not
            if (await _userManager.Users.AnyAsync(user => user.Email == registerDto.Email))
            {
                return BadRequest("Email is already exists, try login");
            }

            // make sure the username is unique too
            if (await _userManager.Users.AnyAsync(user => user.UserName == registerDto.Username))
            {
                return BadRequest("Username taken");
            }

            var user = new AppUser
            {
                Email = registerDto.Email,
                UserName = registerDto.Username
            };

            var userWasCreated = await _userManager.CreateAsync(user, registerDto.Password);

            if (userWasCreated.Succeeded)
            {
                return CreateUserObject(user);
            }

            return BadRequest("unable to registering new user");
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            return CreateUserObject(user);
        }
        
        [HttpGet("{email}")]
        public async Task<ActionResult<UserDto>> GetUserByEmail(string email)
        {
            var user = await _context.Users.Where(user => user.Email == email).FirstOrDefaultAsync();

            return CreateUserObject(user);
        }

        [HttpPost("upload-resume")]
        public async Task<IActionResult> UploadResume([FromForm]IFormFile resume)
        {
            if (resume.Length <= 0) return Ok();
            
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            
            var filePath = Path.Combine("Resumes", 
                Path.GetFileName(resume.FileName));

            await using (var stream = System.IO.File.Create(filePath))
            {
                await resume.CopyToAsync(stream);
                var theUser = await _context.Users.FindAsync(user.Id);
                theUser.Resume = filePath.Replace("Resumes/", "");
                await _context.SaveChangesAsync();
            }
            

            return Ok();
        }

        [HttpGet("download/{fileName}")]
        public PhysicalFileResult DownloadResume(string fileName)
        {
            //Determine the Content Type of the File.
            var contentType = "";
            new FileExtensionContentTypeProvider().TryGetContentType(fileName, out contentType);
            //Build the File Path.
            var path = Path.Combine("Resumes/", fileName);
            return new PhysicalFileResult(path, contentType);
        }

        private UserDto CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.GenerateToken(user),
                IsAdmin = user.IsAdmin,
                Resume = user.Resume,
                CurrentPosition = user.CurrentPosition,
                Email = user.Email
            };
        }
    }
}