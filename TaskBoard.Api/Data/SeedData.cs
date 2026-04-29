using TaskBoard.Api.Models;

namespace TaskBoard.Api.Data
{
    public static class SeedData
    {
        public static async Task InitializeAsync(AppDbContext context)
        {
            if (context.Projects.Any())
                return;

            var websiteProject = new ProjectItem
            {
                Name = "Company Website Redesign",
                Description = "Upgrade landing pages and dashboard UI"
            };

            var mobileProject = new ProjectItem
            {
                Name = "Mobile App Launch",
                Description = "Prepare MVP for Android and iOS"
            };

            context.Projects.AddRange(websiteProject, mobileProject);
            await context.SaveChangesAsync();

            var tasks = new List<TaskItem>
            {
                new TaskItem
                {
                    ProjectId = websiteProject.Id,
                    Title = "Design homepage",
                    Description = "Modern responsive homepage",
                    Priority = Priority.High,
                    Status = BoardTaskStatus.InProgress,
                    DueDate = DateTime.UtcNow.AddDays(3)
                },

                new TaskItem
                {
                    ProjectId = websiteProject.Id,
                    Title = "SEO audit",
                    Description = "Improve metadata and speed",
                    Priority = Priority.Medium,
                    Status = BoardTaskStatus.Todo,
                    DueDate = DateTime.UtcNow.AddDays(7)
                },

                new TaskItem
                {
                    ProjectId = mobileProject.Id,
                    Title = "Login API integration",
                    Description = "Connect frontend auth flow",
                    Priority = Priority.Critical,
                    Status = BoardTaskStatus.Review,
                    DueDate = DateTime.UtcNow.AddDays(1)
                },

                new TaskItem
                {
                    ProjectId = mobileProject.Id,
                    Title = "Push notifications",
                    Description = "FCM integration",
                    Priority = Priority.Low,
                    Status = BoardTaskStatus.Done,
                    DueDate = DateTime.UtcNow.AddDays(-2)
                }
            };

            context.Tasks.AddRange(tasks);
            await context.SaveChangesAsync();

            var comments = new List<Comment>
            {
                new Comment
                {
                    TaskId = tasks[0].Id,
                    Author = "Mayur",
                    Body = "Initial design draft completed"
                },

                new Comment
                {
                    TaskId = tasks[0].Id,
                    Author = "Admin",
                    Body = "Please improve mobile spacing"
                },

                new Comment
                {
                    TaskId = tasks[2].Id,
                    Author = "Tester",
                    Body = "Auth token refresh tested"
                }
            };

            context.Comments.AddRange(comments);
            await context.SaveChangesAsync();
        }
    }
}