import Vue from "vue";
import _Vue from "vue";
import {IShoppingList} from "@/domain/shoppingList";

export interface IState {
    shoppingList: IShoppingList | null
}

const state: IState = {
    shoppingList: null
};

export function Store(vue: typeof _Vue): void {
    vue.prototype.$store = new Vue({
        data: state
    });
}