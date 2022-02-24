using Domain;
using FluentValidation;

namespace Application.Jobs
{
    public class JobValidator : AbstractValidator<Job>
    {
        public JobValidator()
        {
            RuleFor(job => job.Title).NotEmpty();
            RuleFor(job => job.Description).NotEmpty();
        }
    }
}