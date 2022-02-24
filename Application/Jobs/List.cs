using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Jobs
{
    public class List
    {
        public class Query : IRequest<ResponseResult<List<Job>>>
        {
        }

        public class Handler : IRequestHandler<Query, ResponseResult<List<Job>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<ResponseResult<List<Job>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var jobs = await _context.Jobs.OrderByDescending(j => j.CreatedAt)
                    .Include(job => job.Applications)
                    .ToListAsync(cancellationToken: cancellationToken);

                return ResponseResult<List<Job>>.Success(jobs);
            }
        }
    }
}