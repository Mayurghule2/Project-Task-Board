using System.ComponentModel.DataAnnotations;

namespace TaskBoard.Api.DTOs.Project
{
    public class UpdateProjectDto
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(300)]
        public string? Description { get; set; }
    }
}