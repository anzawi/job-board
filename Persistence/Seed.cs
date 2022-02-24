using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    /// <summary>
    /// Seed some data
    /// </summary>
    public class Seed
    {
        // seed some jobs
        public static async Task SeedJobs(DataContext context)
        {
            if (context.Jobs.Any()) return;

            var jobs = new List<Job>
            {
                new()
                {
                    Title = "Full-Stack Developer",
                    Description =
                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                        CompanyName = "sample company",
                        SalaryFrom = 500,
                        SalaryTo = 900
                },
                new()
                {
                    Title = "Back-end Developer",
                    Description =
                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                        CompanyName = "sample company",
                        SalaryFrom = 500,
                        SalaryTo = 900
                },
                new()
                {
                    Title = "Front-end Developer",
                    Description =
                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                        CompanyName = "sample company",
                        SalaryFrom = 500,
                        SalaryTo = 900
                },
                new()
                {
                    Title = "Software engineer",
                    Description =
                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                        CompanyName = "sample company",
                        SalaryFrom = 500,
                        SalaryTo = 900
                },
            };

            await context.AddRangeAsync(jobs);
            await context.SaveChangesAsync();
        }

        // seed 2 users (admin, job-seeker)
        public static async Task SeedUsers(DataContext context, UserManager<AppUser> userManager)
        {
            if (userManager.Users.Any()) return;

            var users = new List<AppUser>
            {
                new()
                {
                    Email = "admin@email.test",
                    IsAdmin = true,
                    UserName = "Admin",
                },
                new()
                {
                    Email = "user@email.test",
                    IsAdmin = false,
                    UserName = "Mohammad",
                    CurrentPosition = "Full Stack Developer"
                }
            };

            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "P@ssw0rd");
            }
        }
    }
}