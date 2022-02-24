using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class MainController : ControllerBase
    {
        private IMediator _mediator;

        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices
            .GetService<IMediator>();

        protected ActionResult Response<T>(ResponseResult<T> result)
        {
            if (result == null)
            {
                return NotFound();
            }
            
            return result.IsSuccess switch
            {
                true when result.Value != null => Ok(result.Value),
                true when result.Value == null => NotFound(),
                _ => BadRequest()
            };
        }
    }
}