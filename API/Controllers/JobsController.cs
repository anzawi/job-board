using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Jobs;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class JobsController : MainController
    {
        // get all jobs
        [HttpGet]
        public async Task<ActionResult<List<Job>>> GetJobsList()
        {
            return Response(await Mediator.Send(new List.Query()));
        }

        // get single job with all applications related
        [HttpGet("{id}")]
        public async Task<ActionResult<Job>> GetJob(Guid id)
        {
            return Response(await Mediator.Send(new Details.Query { Id = id }));
        }

        // create new job
        [HttpPost]
        public async Task<ActionResult<Job>> CreateJob(Job job)
        {
            return Response(await Mediator.Send(new Create.Command { Job = job }));
        }

        // edit job
        [HttpPut("{id}")]
        public async Task<ActionResult<Job>> UpdateJob(Guid id, Job job)
        {
            job.Id = id;
            return Response(await Mediator.Send(new Edit.Command { Job = job }));
        }

        // delete job
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJob(Guid id)
        {
            return Response(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}