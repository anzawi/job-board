using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Jobs
{
    public class Delete
    {
        public class Command : IRequest<ResponseResult<Unit>>
        {
            public Guid Id { set; get; }
        }

        public class Handler : IRequestHandler<Command, ResponseResult<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<ResponseResult<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var job = await _context.Jobs.FindAsync(request.Id);
                var applications = await _context.Applications.Where(a => a.Job == job)
                    .ToListAsync(cancellationToken: cancellationToken);
                _context.RemoveRange(applications);
                if (job == null) return null;
                _context.Remove(job);
                var deleted = await _context.SaveChangesAsync(cancellationToken) > 0;
                return !deleted
                    ? ResponseResult<Unit>.Failure($"Unable to delete job")
                    : ResponseResult<Unit>.Success(Unit.Value);
            }
        }
    }
}