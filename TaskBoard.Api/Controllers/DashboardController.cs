using Microsoft.AspNetCore.Mvc;
using TaskBoard.Api.Interfaces;

namespace TaskBoard.Api.Controllers
{
    [ApiController]
    [Route("api/dashboard")]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _service;

        public DashboardController(IDashboardService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetSummary()
        {
            var data = await _service.GetSummaryAsync();

            return Ok(data);
        }
    }
}