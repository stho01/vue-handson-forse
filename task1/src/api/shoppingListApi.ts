"use strict";

import {delay} from './delay';
import {IShoppingList} from "@/domain/shoppingList";
import {IShoppingListDto} from "@/dto/shoppingList";

class ShoppingListApi {

    private shoppingList: IShoppingList = {id: 'ABC123', name: 'Min liste', entries: [
            {
                product: { id: "ABC123", name: "Name" },
                amount: 1
            }
        ]};

    //********************************************

    async getShoppingList(): Promise<IShoppingListDto> {
        await delay();

        return {
            id: this.shoppingList.id,
            entries: this.shoppingList.entries,
            name: this.shoppingList.name
        };
    }

    //********************************************

    async saveShoppingList(list: IShoppingListDto): Promise<void> {
        await delay();

        this.shoppingList = {
            id: list.id,
            entries: list.entries,
            name: list.name
        };
    }
}

export const shoppingListApi = new ShoppingListApi();
