using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Infrastructure
{
    public class UserIsAdminRequirement : IAuthorizationRequirement
    {
    }

    public class UserIsAdminRequirementHandler : AuthorizationHandler<UserIsAdminRequirement>
    {
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _contextAccessor;

        public UserIsAdminRequirementHandler(DataContext context, IHttpContextAccessor contextAccessor)
        {
            _context = context;
            _contextAccessor = contextAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
            UserIsAdminRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = _context.Users.FindAsync(userId).Result;

            if (user is { IsAdmin: true })
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }
}