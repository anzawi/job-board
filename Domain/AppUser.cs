using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public bool IsAdmin { set; get; } = false;
        public string Resume { set; get; } = null;

        public string CurrentPosition { set; get; } = null;
        //public ICollection<Application> Applications { set; get; }
    }
}