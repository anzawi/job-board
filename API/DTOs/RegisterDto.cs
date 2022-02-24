using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required] [EmailAddress] public string Email { set; get; }

        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$",
            ErrorMessage = "Password must contains capital and small letters, symbols, and numbers - length 4-8 characters.")]
        public string Password { set; get; }

        [Required] public string Username { set; get; }
    }
}