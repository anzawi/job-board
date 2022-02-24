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
    /// create new job
    /// </summary>
    public class Create
    {
        public class Command : IRequest<ResponseResult<Job>>
        {
            // job details
            public Job Job { set; get; }
        }

        /// <summary>
        /// data validation
        /// </summary>
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(command => command.Job).SetValidator(new JobValidator());
            }
        }

        /// <summary>
        /// handle creating
        /// </summary>
        public class Handler : IRequestHandler<Command, ResponseResult<Job>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<ResponseResult<Job>> Handle(Command request, CancellationToken cancellationToken)
            {
                // insert new job to database
                var job = _context.Add(request.Job);
                var created = await _context.SaveChangesAsync(cancellationToken) > 0;
                return !created
                    ? ResponseResult<Job>.Failure("Unable to create new Job")
                    : ResponseResult<Job>.Success(job.Entity);
            }
        }
    }
}