using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Services;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Applications
{
    /// <summary>
    /// get all applications for user
    /// </summary>
    public class UserList
    {
        public class Query : IRequest<ResponseResult<List<Domain.Application>>>
        {
            public Guid UserId { set; get; }
        }

        public class Handler : IRequestHandler<Query, ResponseResult<List<Domain.Application>>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<ResponseResult<List<Domain.Application>>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var user = await _context.Users
                    .FirstOrDefaultAsync(user =>
                        user.UserName == _userAccessor.GetUsername(), cancellationToken: cancellationToken);


                var applications = _context.Applications.Where(application => application.User == user)
                    .Include(application => application.Job)
                    .ToList();


                return ResponseResult<List<Domain.Application>>.Success(applications);
            }
        }
    }
}