using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Jobs
{
    public class Details
    {
        public class Query : IRequest<ResponseResult<Job>>
        {
            public Guid Id { set; get; }
        }

        public class Handler : IRequestHandler<Query, ResponseResult<Job>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<ResponseResult<Job>> Handle(Query request, CancellationToken cancellationToken)
            {
                var job = await _context.Jobs
                    .Include(apps => apps.Applications)
                    .ThenInclude(application => application.User)
                    .FirstOrDefaultAsync(job => job.Id == request.Id, cancellationToken: cancellationToken);

                return ResponseResult<Job>.Success(job);
            }
        }
    }
}