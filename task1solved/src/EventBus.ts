import Vue from "vue";

export enum EventBusEvents {
    DISPLAY_NOTIFICATION = "display-notification"
}

export interface IEventBus {
    $on(event: EventBusEvents, callback: Function): this;
    $once(event: EventBusEvents, callback: Function): this;
    $off(event?: EventBusEvents, callback?: Function): this;
    $emit(event: EventBusEvents, ...args: any[]): this;
}

export const EventBus: IEventBus = new Vue();
