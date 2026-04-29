using TaskBoard.Api.DTOs.Task;

namespace TaskBoard.Api.DTOs.Project
{
    public class ProjectDetailsDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }

        public DateTime CreatedAt { get; set; }

        public List<TaskResponseDto> Tasks { get; set; } = new();
    }
}