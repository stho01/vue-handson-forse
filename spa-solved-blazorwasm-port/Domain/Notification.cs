namespace Forse.Shop.Domain;

public enum NotificationType
{
    Message = 0,
    Error = 1
}

public record Notification(string Message)
{
    public NotificationType? Type { get; init; }
}