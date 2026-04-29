namespace TaskBoard.Api.Models
{
    public enum Priority
    {
        Low,
        Medium,
        High,
        Critical
    }

    public enum BoardTaskStatus
    {
        Todo,
        InProgress,
        Review,
        Done
    }
}