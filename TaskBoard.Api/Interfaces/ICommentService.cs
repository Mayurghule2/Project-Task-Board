using TaskBoard.Api.DTOs.Comment;

namespace TaskBoard.Api.Interfaces
{
    public interface ICommentService
    {
        Task<List<CommentResponseDto>> GetByTaskAsync(int taskId);

        Task<CommentResponseDto> CreateAsync(int taskId, CreateCommentDto dto);

        Task<bool> DeleteAsync(int id);
    }
}