using System;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Application
    {
        [Key] public Guid Id { set; get; } = Guid.NewGuid();
        public Job Job { set; get; }
        public AppUser User { set; get; }
        public bool Seen { set; get; } = false;
        public DateTime CreatedAt { set; get; } = DateTime.UtcNow;
    }
}