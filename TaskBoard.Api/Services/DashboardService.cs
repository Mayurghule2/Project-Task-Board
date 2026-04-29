using Microsoft.EntityFrameworkCore;
using TaskBoard.Api.Data;
using TaskBoard.Api.DTOs.Dashboard;
using TaskBoard.Api.Interfaces;
using TaskBoard.Api.Models;

namespace TaskBoard.Api.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly AppDbContext _context;

        public DashboardService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<DashboardResponseDto> GetSummaryAsync()
        {
            var today = DateTime.UtcNow.Date;
            var next7Days = today.AddDays(7);

            var tasks = _context.Tasks.AsQueryable();

            return new DashboardResponseDto
            {
                TotalProjects = await _context.Projects.CountAsync(),
                TotalTasks = await tasks.CountAsync(),

                TodoTasks = await tasks.CountAsync(t =>
                    t.Status == BoardTaskStatus.Todo),

                InProgressTasks = await tasks.CountAsync(t =>
                    t.Status == BoardTaskStatus.InProgress),

                ReviewTasks = await tasks.CountAsync(t =>
                    t.Status == BoardTaskStatus.Review),

                DoneTasks = await tasks.CountAsync(t =>
                    t.Status == BoardTaskStatus.Done),

                OverdueTasks = await tasks.CountAsync(t =>
                    t.DueDate != null &&
                    t.DueDate < today &&
                    t.Status != BoardTaskStatus.Done),

                DueWithin7Days = await tasks.CountAsync(t =>
                    t.DueDate != null &&
                    t.DueDate >= today &&
                    t.DueDate <= next7Days)
            };
        }
    }
}