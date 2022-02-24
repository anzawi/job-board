using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Services;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Applications
{
    public class Patch
    {
        public class Command : IRequest<ResponseResult<Domain.Application>>
        {
            public Guid Id { set; get; }
        }


        public class Handler : IRequestHandler<Patch.Command, ResponseResult<Domain.Application>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<ResponseResult<Domain.Application>> Handle(Patch.Command request,
                CancellationToken cancellationToken)
            {
                var application = await _context.Applications.Where(app => app.Id == request.Id)
                    .FirstOrDefaultAsync(cancellationToken);
                var patched = true;
                if (!application.Seen)
                {
                    application.Seen = true;
                    patched = await _context.SaveChangesAsync(cancellationToken) > 0;
                }

                return !patched
                    ? ResponseResult<Domain.Application>.Failure("Unable to create new Job")
                    : ResponseResult<Domain.Application>.Success(application);
            }
        }
    }
}