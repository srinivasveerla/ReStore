using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {

        [HttpGet("not-found")]
        public ActionResult GetNotFound()
        {
            return NotFound();
        }

        [HttpGet("bad-request")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ProblemDetails { Title = "Bloody bad request sender!!!!" });
        }

        [HttpGet("unauthorized")]
        public ActionResult Getunauthorized()
        {
            return Unauthorized();
        }

        [HttpGet("validation-error")]
        public ActionResult GetValidationError()
        {
            ModelState.AddModelError("Problem1", "Bruvvvvv- P1");
            ModelState.AddModelError("Problem2", "Bruvvvvv- P2");
            return ValidationProblem();
        }

        [HttpGet("server-error")]
        public ActionResult GetServerError()
        {
            // it is getting handled in the ExceptionMiddleware (check about middleware in the docs!!!)
            throw new Exception("My life, my(server) problem!!!");
        }
    }
}