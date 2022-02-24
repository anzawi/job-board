namespace API.DTOs
{
    public class UserDto
    {
        public string Username { set; get; }
        public string Token { set; get; }
        public string CurrentPosition { set; get; }
        public string Resume { set; get; }
        public string Email { set; get; }
        public bool IsAdmin { set; get; }
    }
}