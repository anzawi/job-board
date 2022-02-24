using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Applications
{
    public class Details
    {
        public class Query : IRequest<ResponseResult<Domain.Application>>
        {
            public Guid Id { set; get; }
        }

        public class Handler : IRequestHandler<Query, ResponseResult<Domain.Application>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<ResponseResult<Domain.Application>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var application = await _context.Applications
                    .Include(application => application.Job)
                    .Include(application => application.User)
                    .FirstOrDefaultAsync(a => a.Id == request.Id, cancellationToken: cancellationToken);

                return ResponseResult<Domain.Application>.Success(application);
            }
        }
    }
}