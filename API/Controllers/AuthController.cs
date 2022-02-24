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
    /// <summary>
    /// auth controller
    /// to manage users, login, register and logout
    /// </summary>
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

        /// <summary>
        /// login
        /// </summary>
        /// <param name="loginDetails"></param>
        /// <returns></returns>
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDetails)
        {
            // check if email exists
            var user = await _userManager.FindByEmailAsync(loginDetails.Email);
            if (user == null) return Unauthorized();

            // try login using password
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDetails.Password, false);

            // check if login process success
            if (result.Succeeded)
            {
                return CreateUserObject(user);
            }

            // if users is not exists return unauthorized status
            return Unauthorized();
        }

        /// <summary>
        /// create new user
        /// </summary>
        /// <param name="registerDto"></param>
        /// <returns></returns>
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

            // create user object
            var user = new AppUser
            {
                Email = registerDto.Email,
                UserName = registerDto.Username
            };

            // create a user
            var userWasCreated = await _userManager.CreateAsync(user, registerDto.Password);

            if (userWasCreated.Succeeded)
            {
                // return created user to make front-end make him login after register
                return CreateUserObject(user);
            }

            return BadRequest("unable to registering new user");
        }

        /// <summary>
        /// get authorized user 
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            return CreateUserObject(user);
        }
        
        /// <summary>
        /// get user by email [for view application page]
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        [HttpGet("{email}")]
        public async Task<ActionResult<UserDto>> GetUserByEmail(string email)
        {
            var user = await _context.Users.Where(user => user.Email == email).FirstOrDefaultAsync();

            return CreateUserObject(user);
        }

        /// <summary>
        /// upload user resume
        /// </summary>
        /// <param name="resume"></param>
        /// <returns></returns>
        [HttpPost("upload-resume")]
        public async Task<IActionResult> UploadResume([FromForm]IFormFile resume)
        {
            // if file is empty
            if (resume.Length <= 0) return Ok();
            
            // get user
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            
            // init file path
            var filePath = Path.Combine("Resumes", 
                Path.GetFileName(resume.FileName));

            // trying create file
            await using (var stream = System.IO.File.Create(filePath))
            {
                await resume.CopyToAsync(stream);
                var theUser = await _context.Users.FindAsync(user.Id);
                theUser.Resume = filePath.Replace("Resumes/", "");
                await _context.SaveChangesAsync();
            }
            

            return Ok("");
        }

        /// <summary>
        /// download user resume
        /// </summary>
        /// <param name="fileName"></param>
        /// <returns></returns>
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

        /// <summary>
        /// helper method to generate user data transform object
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
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