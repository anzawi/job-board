using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Jobs;
using Application.Services;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Applications
{
    public class Create
    {
        public class Command : IRequest<ResponseResult<Domain.Application>>
        {
            public Domain.Application Application { set; get; }
            public Guid JobId { set; get; }
        }


        public class Handler : IRequestHandler<Command, ResponseResult<Domain.Application>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<ResponseResult<Domain.Application>> Handle(Command request,
                CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(user =>
                    user.UserName == _userAccessor.GetUsername(), cancellationToken: cancellationToken);
                request.Application.User = user;

                var job = await _context.Jobs.FindAsync(request.JobId);
                request.Application.Job = job;
                

                var application = await _context.Applications.AddAsync(request.Application, cancellationToken);
                var created = await _context.SaveChangesAsync(cancellationToken) > 0;
                return !created
                    ? ResponseResult<Domain.Application>.Failure("Unable to create new Job")
                    : ResponseResult<Domain.Application>.Success(application.Entity);
            }
        }
    }
}