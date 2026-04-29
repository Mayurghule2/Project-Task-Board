namespace TaskBoard.Api.DTOs.Task
{
    public class TaskQueryDto
    {
        public string? Status { get; set; }

        public string? Priority { get; set; }

        public string? SortBy { get; set; } = "createdAt";

        public string? SortDir { get; set; } = "desc";

        public int Page { get; set; } = 1;


        public int PageSize { get; set; } = 10;
    }
}