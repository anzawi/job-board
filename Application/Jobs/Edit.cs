using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Jobs
{
    /// <summary>
    /// Edit job
    /// maybe I'll not handle a job editing in front-end
    /// but its ready in api
    /// </summary>
    public class Edit
    {
        public class Command : IRequest<ResponseResult<Job>>
        {
            public Job Job { set; get; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(command => command.Job).SetValidator(new JobValidator());
            }
        }

        public class Handler : IRequestHandler<Command, ResponseResult<Job>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<ResponseResult<Job>> Handle(Command request, CancellationToken cancellationToken)
            {
                var job = await _context.Jobs.FindAsync(request.Job.Id);
                _mapper.Map(request.Job, job);

                var updated = await _context.SaveChangesAsync(cancellationToken) > 0;
                return !updated
                    ? ResponseResult<Job>.Failure($"Unable to update Job {request.Job.Title}")
                    : ResponseResult<Job>.Success(request.Job);
            }
        }
    }
}