import {NotificationType} from "../domain/notification";
<template>
    <div class="shopping-cart">
        <h1>Handleliste</h1>
        <table>
            <colgroup>
                <col>
                <col>
                <col style="width: 100px">
            </colgroup>
            <thead>
            <tr>
                <th colspan="3">Handleliste</th>
            </tr>
            <tr>
                <th>Navn</th>
                <th>Antall</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="entry in shoppingEntries" :key="entry.id">
                <td>{{entry.product.name}}</td>
                <td>{{entry.amount}} stk</td>
                <td>
                    <app-button @click="removeEntry(entry)">Fjern</app-button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
<script lang="ts">

    import Vue from "vue";
    import {Component, Prop} from "vue-property-decorator";
    import {IShoppingEntry} from "@/domain/shoppingList";
    import AppButton from "@/components/shared/AppButton.vue";
    import INotification, {NotificationType} from "@/domain/notification";
    import {EventBusEvents, IEventBus} from "@/EventBus";

    @Component({
        name: "shopping-cart",
        components: {AppButton}
    })
    export default class ShoppingCart extends Vue {


        @Prop() // TODO: Inject event bus!
        eventBus !: IEventBus | null;

        //** COMPUTED:

        get shoppingEntries(): IShoppingEntry[] {
            // TODO: return shopping entries
            return [];
        }

        //** METHODS:

        async removeEntry(entry: IShoppingEntry): Promise<void> {
            // TODO: Remove entry.

            this._notifyIfEventBusIsSet({
                message: "Implement me",
                type: NotificationType.ERROR
            });
        }

        private _notifyIfEventBusIsSet(notification: INotification | string): void {
            if (this.eventBus != null) {
                if (typeof notification === "string") {
                    this.eventBus.$emit(EventBusEvents.DISPLAY_NOTIFICATION, {
                        message: notification
                    });
                } else {
                    this.eventBus.$emit(EventBusEvents.DISPLAY_NOTIFICATION, notification);
                }
            }
        }
    }
</script>