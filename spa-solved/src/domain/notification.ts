export enum NotificationType {
    MESSAGE,
    ERROR
}

export default interface INotification {
    message: string;
    type?: NotificationType
}