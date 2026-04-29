using System.ComponentModel.DataAnnotations;

namespace TaskBoard.Api.Models
{
    public class TaskItem
    {
        public int Id { get; set; }

        public int ProjectId { get; set; }

        public ProjectItem? Project { get; set; }

        [Required]
        [MaxLength(150)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(1000)]
        public string? Description { get; set; }

        public Priority Priority { get; set; } = Priority.Low;

        public BoardTaskStatus  Status { get; set; } = BoardTaskStatus .Todo;

        public DateTime? DueDate { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }
}