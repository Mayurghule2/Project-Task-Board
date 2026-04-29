using TaskBoard.Api.DTOs.Task;
using TaskBoard.Api.Helpers;

namespace TaskBoard.Api.Interfaces
{
    public interface ITaskService
    {
        Task<PagedResult<TaskResponseDto>> GetByProjectAsync(
            int projectId,
            string? status,
            string? priority,
            string? sortBy,
            string? sortDir,
            int page,
            int pageSize);

        Task<TaskResponseDto?> GetByIdAsync(int id);

        Task<TaskResponseDto> CreateAsync(int projectId, CreateTaskDto dto);

        Task<bool> UpdateAsync(int id, UpdateTaskDto dto);

        Task<bool> DeleteAsync(int id);
    }
}