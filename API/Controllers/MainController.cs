using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
    /// <summary>
    /// main controller
    /// all controllers will inherent
    /// </summary>
    [ApiController] // let app know that, this controller and all inherited are API controllers
    [Route("api/v1/[controller]")] // set up uri
    public class MainController : ControllerBase
    {
        // setup IMediatR
        private IMediator _mediator;

        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices
            .GetService<IMediator>();

        /// <summary>
        /// helper method
        /// to standardize the response for all controllers
        /// </summary>
        /// <param name="result"></param>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
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