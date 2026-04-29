using System.ComponentModel.DataAnnotations;

namespace TaskBoard.Api.DTOs.Comment
{
    public class CreateCommentDto
    {
        [Required]
        [MaxLength(50)]
        public string Author { get; set; } = string.Empty;

        [Required]
        [MaxLength(500)]
        public string Body { get; set; } = string.Empty;
    }
}