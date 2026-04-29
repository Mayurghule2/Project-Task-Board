namespace TaskBoard.Api.DTOs.Comment
{
    public class CommentResponseDto
    {
        public int Id { get; set; }

        public int TaskId { get; set; }

        public string Author { get; set; } = string.Empty;

        public string Body { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }
    }
}