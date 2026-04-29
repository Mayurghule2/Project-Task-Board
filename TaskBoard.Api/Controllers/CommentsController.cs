using Microsoft.AspNetCore.Mvc;
using TaskBoard.Api.DTOs.Comment;
using TaskBoard.Api.Interfaces;

namespace TaskBoard.Api.Controllers
{
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentService _service;

        public CommentsController(ICommentService service)
        {
            _service = service;
        }

        [HttpGet("api/tasks/{taskId}/comments")]
        public async Task<IActionResult> GetByTask(int taskId)
        {
            var comments = await _service.GetByTaskAsync(taskId);

            return Ok(comments);
        }

        [HttpPost("api/tasks/{taskId}/comments")]
        public async Task<IActionResult> Create(
            int taskId,
            CreateCommentDto dto)
        {
            var created = await _service.CreateAsync(taskId, dto);

            return Ok(created);
        }

        [HttpDelete("api/comments/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);

            if (!deleted)
                return NotFound();

            return NoContent();
        }
    }
}