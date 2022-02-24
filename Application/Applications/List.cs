using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Applications
{
    public class List
    {
        
        public class Query : IRequest<ResponseResult<List<Domain.Application>>>
        {
        }

        public class Handler : IRequestHandler<Query, ResponseResult<List<Domain.Application>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<ResponseResult<List<Domain.Application>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var applications = await _context.Applications
                    //.Include(job => job.Job)
                    .ToListAsync(cancellationToken: cancellationToken);
                
                return ResponseResult<List<Domain.Application>>.Success(applications);
            }
        }
    }
}