using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Applications;
using Microsoft.AspNetCore.Mvc;
using Details = Application.Applications.Details;

namespace API.Controllers
{
    /// <summary>
    /// Application controller
    /// get all, get single, create applications
    /// application cant deleted or edited 
    /// </summary>
    public class ApplicationsController : MainController
    {
        // get all applications
        [HttpGet]
        public async Task<ActionResult<List<Domain.Application>>> GetApplicationsList()
        {
            return Response(await Mediator.Send(new List.Query()));
        }

        // get single application
        [HttpGet("{id}")]
        public async Task<ActionResult<Domain.Application>> GetApplication(Guid id)
        {
            return Response(await Mediator.Send(new Details.Query { Id = id }));
        }

        // get all user applications
        [HttpGet("user")]
        public async Task<ActionResult<List<Domain.Application>>> GetUserApplications()
        {
            return Response(await Mediator.Send(new UserList.Query()));
        }

        // apply to job
        [HttpPost("{jobId}")]
        public async Task<ActionResult<Domain.Application>> CreateApplication(Guid jobId, Domain.Application application)
        {
            return Response(await Mediator.Send(new Create.Command { Application = application, JobId = jobId}));
        }
        
        // set applications as seen
        [HttpPatch("{applicationId}")]
        public async Task<ActionResult<Domain.Application>> SetApplicationSeen(Guid applicationId)
        {
            // we can send user email to notify about this application is seen
            // but really I dont have a time to do that now :)
            return Response(await Mediator.Send(new Patch.Command { Id = applicationId}));
        }
    }
}