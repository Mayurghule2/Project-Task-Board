namespace TaskBoard.Api.DTOs.Dashboard
{
    public class DashboardResponseDto
    {
        public int TotalProjects { get; set; }

        public int TotalTasks { get; set; }

        public int TodoTasks { get; set; }

        public int InProgressTasks { get; set; }

        public int ReviewTasks { get; set; }

        public int DoneTasks { get; set; }

        public int OverdueTasks { get; set; }

        public int DueWithin7Days { get; set; }
    }
}