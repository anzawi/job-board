using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public sealed class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        

        /// <summary>
        /// Jobs table
        /// </summary>
        public DbSet<Job> Jobs { set; get; }
        /// <summary>
        /// Applications table
        /// </summary>
        public DbSet<Application> Applications { set; get; }
        
        // users table will handle from identity framework
    }
}