using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Job
    {
        [Key]
        public Guid Id { set; get; } = Guid.NewGuid();
        public string Title { get; set; }
        public string Description { set; get; }
        public ICollection<Application> Applications { set; get; }
        
        public string CompanyName { set; get; }
        public decimal? SalaryFrom { set; get; }
        public decimal? SalaryTo { set; get; }
        
        
        public DateTime CreatedAt { set; get; } = DateTime.UtcNow;
        public DateTime ExpireAt { set; get; } = DateTime.UtcNow.AddMonths(1);
    }
}