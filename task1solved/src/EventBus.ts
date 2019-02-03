import Vue from "vue";

export interface IEventBus {
    $on(event: string | string[], callback: Function): this;
    $once(event: string | string[], callback: Function): this;
    $off(event?: string | string[], callback?: Function): this;
    $emit(event: string, ...args: any[]): this;
}

export const EventBus: IEventBus = new Vue();