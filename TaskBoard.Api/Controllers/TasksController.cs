using Microsoft.AspNetCore.Mvc;
using TaskBoard.Api.DTOs.Task;
using TaskBoard.Api.Interfaces;

namespace TaskBoard.Api.Controllers
{
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _service;

        public TasksController(ITaskService service)
        {
            _service = service;
        }

        [HttpGet("api/projects/{projectId}/tasks")]
        public async Task<IActionResult> GetByProject(
            int projectId,
            string? status,
            string? priority,
            string? sortBy = "createdAt",
            string? sortDir = "desc",
            int page = 1,
            int pageSize = 10)
        {
            pageSize = Math.Min(pageSize, 50);

            var result = await _service.GetByProjectAsync(
                projectId, status, priority,
                sortBy, sortDir, page, pageSize);

            return Ok(result);
        }

        [HttpGet("api/tasks/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var task = await _service.GetByIdAsync(id);

            if (task == null)
                return NotFound();

            return Ok(task);
        }

        [HttpPost("api/projects/{projectId}/tasks")]
        public async Task<IActionResult> Create(int projectId, CreateTaskDto dto)
        {
            var created = await _service.CreateAsync(projectId, dto);

            return CreatedAtAction(nameof(GetById),
                new { id = created.Id }, created);
        }

        [HttpPut("api/tasks/{id}")]
        public async Task<IActionResult> Update(int id, UpdateTaskDto dto)
        {
            var updated = await _service.UpdateAsync(id, dto);

            if (!updated)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("api/tasks/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);

            if (!deleted)
                return NotFound();

            return NoContent();
        }
    }
}