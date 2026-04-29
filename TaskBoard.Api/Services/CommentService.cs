using Microsoft.EntityFrameworkCore;
using TaskBoard.Api.Data;
using TaskBoard.Api.DTOs.Comment;
using TaskBoard.Api.Interfaces;
using TaskBoard.Api.Models;

namespace TaskBoard.Api.Services
{
    public class CommentService : ICommentService
    {
        private readonly AppDbContext _context;

        public CommentService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<CommentResponseDto>> GetByTaskAsync(int taskId)
        {
            return await _context.Comments
                .Where(c => c.TaskId == taskId)
                .OrderByDescending(c => c.CreatedAt)
                .Select(c => new CommentResponseDto
                {
                    Id = c.Id,
                    TaskId = c.TaskId,
                    Author = c.Author,
                    Body = c.Body,
                    CreatedAt = c.CreatedAt
                })
                .ToListAsync();
        }

        public async Task<CommentResponseDto> CreateAsync(
            int taskId,
            CreateCommentDto dto)
        {
            var comment = new Comment
            {
                TaskId = taskId,
                Author = dto.Author,
                Body = dto.Body
            };

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return new CommentResponseDto
            {
                Id = comment.Id,
                TaskId = comment.TaskId,
                Author = comment.Author,
                Body = comment.Body,
                CreatedAt = comment.CreatedAt
            };
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var comment = await _context.Comments.FindAsync(id);

            if (comment == null)
                return false;

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}