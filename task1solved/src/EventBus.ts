import Vue from "vue";
import INotification from "@/domain/notification";

export enum EventBusEvents {
    DISPLAY_NOTIFICATION = "display-notification"
}

export interface NotificationEventHandler {
    (notification: INotification): void;
}

export interface IEventBus {
    $on(event: EventBusEvents.DISPLAY_NOTIFICATION, callback: NotificationEventHandler): this;
    $on(event: EventBusEvents, callback: Function): this;

    $once(event: EventBusEvents.DISPLAY_NOTIFICATION, callback: NotificationEventHandler): this;
    $once(event: EventBusEvents, callback: Function): this;

    $off(event: EventBusEvents.DISPLAY_NOTIFICATION, callback: NotificationEventHandler): this;
    $off(event?: EventBusEvents, callback?: Function): this;

    $emit(event: EventBusEvents.DISPLAY_NOTIFICATION, notification: INotification): this;
    $emit(event: EventBusEvents, ...args: any[]): this;
}

export const EventBus: IEventBus = new Vue();
