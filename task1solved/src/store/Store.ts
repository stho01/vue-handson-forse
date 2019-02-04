import {IShoppingList} from "../domain/shoppingList";

export interface IStore {
    shoppingList: IShoppingList|null
}

export const Store: IStore = {
    shoppingList: null
};

