using Microsoft.EntityFrameworkCore;
using TaskBoard.Api.Data;
using TaskBoard.Api.DTOs.Task;
using TaskBoard.Api.Helpers;
using TaskBoard.Api.Interfaces;
using TaskBoard.Api.Models;

namespace TaskBoard.Api.Services
{
    public class TaskService : ITaskService
    {
        private readonly AppDbContext _context;

        public TaskService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<PagedResult<TaskResponseDto>> GetByProjectAsync(
            int projectId,
            string? status,
            string? priority,
            string? sortBy,
            string? sortDir,
            int page,
            int pageSize)
        {
            var query = _context.Tasks
                .Where(t => t.ProjectId == projectId)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(status))
                query = query.Where(t => t.Status.ToString() == status);

            if (!string.IsNullOrWhiteSpace(priority))
                query = query.Where(t => t.Priority.ToString() == priority);

            query = (sortBy?.ToLower(), sortDir?.ToLower()) switch
            {
                ("duedate", "asc") => query.OrderBy(t => t.DueDate),
                ("duedate", _) => query.OrderByDescending(t => t.DueDate),

                ("priority", "asc") => query.OrderBy(t => t.Priority),
                ("priority", _) => query.OrderByDescending(t => t.Priority),

                ("createdat", "asc") => query.OrderBy(t => t.CreatedAt),
                _ => query.OrderByDescending(t => t.CreatedAt)
            };

            var totalCount = await query.CountAsync();

            var items = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(t => new TaskResponseDto
                {
                    Id = t.Id,
                    ProjectId = t.ProjectId,
                    Title = t.Title,
                    Description = t.Description,
                    Priority = t.Priority.ToString(),
                    Status = t.Status.ToString(),
                    DueDate = t.DueDate,
                    CreatedAt = t.CreatedAt,
                    UpdatedAt = t.UpdatedAt
                })
                .ToListAsync();

            return new PagedResult<TaskResponseDto>
            {
                Data = items,
                Page = page,
                PageSize = pageSize,
                TotalCount = totalCount,
                TotalPages = (int)Math.Ceiling((double)totalCount / pageSize)
            };
        }

        public async Task<TaskResponseDto?> GetByIdAsync(int id)
        {
            return await _context.Tasks
                .Where(t => t.Id == id)
                .Select(t => new TaskResponseDto
                {
                    Id = t.Id,
                    ProjectId = t.ProjectId,
                    Title = t.Title,
                    Description = t.Description,
                    Priority = t.Priority.ToString(),
                    Status = t.Status.ToString(),
                    DueDate = t.DueDate,
                    CreatedAt = t.CreatedAt,
                    UpdatedAt = t.UpdatedAt
                })
                .FirstOrDefaultAsync();
        }

        public async Task<TaskResponseDto> CreateAsync(int projectId, CreateTaskDto dto)
        {
            var task = new TaskItem
            {
                ProjectId = projectId,
                Title = dto.Title,
                Description = dto.Description,
                Priority = dto.Priority,
                Status = dto.Status,
                DueDate = dto.DueDate
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return await GetByIdAsync(task.Id) ?? new TaskResponseDto();
        }

        public async Task<bool> UpdateAsync(int id, UpdateTaskDto dto)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
                return false;

            task.Title = dto.Title;
            task.Description = dto.Description;
            task.Priority = dto.Priority;
            task.Status = dto.Status;
            task.DueDate = dto.DueDate;

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
                return false;

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}