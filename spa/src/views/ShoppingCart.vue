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
    import {Component, Inject} from "vue-property-decorator";
    import {IShoppingEntry} from "@/domain/shoppingList";
    import AppButton from "@/components/shared/AppButton.vue";
    import {shoppingListApi} from "@/api/shoppingListApi";
    import {NotificationType} from "@/domain/notification";
    import {EventBusEvents, IEventBus} from "@/EventBus";

    @Component({
        name: "shopping-cart",
        components: {AppButton}
    })
    export default class ShoppingCart extends Vue {

        //** INJECTED:

        @Inject("EventBus")
        eventBus !: IEventBus;

        //** COMPUTED:

        get shoppingEntries(): IShoppingEntry[] {
            if (this.$store.shoppingList == null) {
                return [];
            } else {
                return this.$store.shoppingList.entries;
            }
        }

        //** METHODS:

        async removeEntry(entry: IShoppingEntry): Promise<void> {
            if (this.$store.shoppingList == null) {
                this.$store.shoppingList = await shoppingListApi.getShoppingList();
            }

            const index: number = this.$store.shoppingList.entries.indexOf(entry);
            if (index === -1) {
                return;
            }

            const removed: IShoppingEntry = this.$store.shoppingList.entries.splice(index, 1)[0];

            this.eventBus.$emit(EventBusEvents.DISPLAY_NOTIFICATION, {
                message: `${removed.product.name} - (${removed.product.id}) ble fjernet fra listen`
            });

            try {
                await shoppingListApi.saveShoppingList({
                    id: this.$store.shoppingList.id,
                    name: this.$store.shoppingList.name,
                    entries: Array.prototype.slice.apply(this.$store.shoppingList)
                });

            } catch (e) {
                this.$store.shoppingList.entries.push(removed);

                this.eventBus.$emit(EventBusEvents.DISPLAY_NOTIFICATION, {
                    message: e.toString(),
                    type: NotificationType.ERROR
                });
            }
        }
    }
</script>
<style scoped lang="scss">
    .shopping-cart {
    }
</style>