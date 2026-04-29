using Microsoft.EntityFrameworkCore;
using TaskBoard.Api.Models;

namespace TaskBoard.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<ProjectItem> Projects => Set<ProjectItem>();
        public DbSet<TaskItem> Tasks => Set<TaskItem>();
        public DbSet<Comment> Comments => Set<Comment>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Unique project name
            modelBuilder.Entity<ProjectItem>()
                .HasIndex(p => p.Name)
                .IsUnique();

            // Project -> Tasks
            modelBuilder.Entity<ProjectItem>()
                .HasMany(p => p.Tasks)
                .WithOne(t => t.Project)
                .HasForeignKey(t => t.ProjectId)
                .OnDelete(DeleteBehavior.Cascade);

            // Task -> Comments
            modelBuilder.Entity<TaskItem>()
                .HasMany(t => t.Comments)
                .WithOne(c => c.Task)
                .HasForeignKey(c => c.TaskId)
                .OnDelete(DeleteBehavior.Cascade);

            // Store enums as strings
            modelBuilder.Entity<TaskItem>()
                .Property(t => t.Priority)
                .HasConversion<string>();

            modelBuilder.Entity<TaskItem>()
                .Property(t => t.Status)
                .HasConversion<string>();

            // Extra constraints
            modelBuilder.Entity<ProjectItem>()
                .Property(p => p.Name)
                .HasMaxLength(100);

            modelBuilder.Entity<ProjectItem>()
                .Property(p => p.Description)
                .HasMaxLength(300);

            modelBuilder.Entity<TaskItem>()
                .Property(t => t.Title)
                .HasMaxLength(150);

            modelBuilder.Entity<TaskItem>()
                .Property(t => t.Description)
                .HasMaxLength(1000);

            modelBuilder.Entity<Comment>()
                .Property(c => c.Author)
                .HasMaxLength(50);

            modelBuilder.Entity<Comment>()
                .Property(c => c.Body)
                .HasMaxLength(500);
        }

        public override async Task<int> SaveChangesAsync(
            CancellationToken cancellationToken = default)
        {
            var entries = ChangeTracker.Entries();

            foreach (var entry in entries)
            {
                if (entry.Entity is ProjectItem project &&
                    entry.State == EntityState.Added)
                {
                    project.CreatedAt = DateTime.UtcNow;
                }

                if (entry.Entity is TaskItem task)
                {
                    if (entry.State == EntityState.Added)
                    {
                        task.CreatedAt = DateTime.UtcNow;
                    }

                    if (entry.State == EntityState.Added ||
                        entry.State == EntityState.Modified)
                    {
                        task.UpdatedAt = DateTime.UtcNow;
                    }
                }

                if (entry.Entity is Comment comment &&
                    entry.State == EntityState.Added)
                {
                    comment.CreatedAt = DateTime.UtcNow;
                }
            }

            return await base.SaveChangesAsync(cancellationToken);
        }
    }
}