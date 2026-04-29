using System.ComponentModel.DataAnnotations;
using TaskBoard.Api.Models;

namespace TaskBoard.Api.DTOs.Task
{
    public class UpdateTaskDto
    {
        [Required]
        [MaxLength(150)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(1000)]
        public string? Description { get; set; }

        public Priority Priority { get; set; }

        public BoardTaskStatus Status { get; set; }

        public DateTime? DueDate { get; set; }
    }
}