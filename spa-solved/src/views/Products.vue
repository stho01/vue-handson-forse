import {EventBusEvents} from "../EventBus";
<template>
    <div class="products">
        <h1>Produkter</h1>
        <wait v-if="loading">Vennligst vent mens produkter laster inn...</wait>
        <div v-else>
            <table>
                <colgroup>
                    <col>
                    <col>
                    <col width="130px">
                </colgroup>
                <thead>
                <tr>
                    <th colspan="3">Produkter</th>
                </tr>
                <tr>
                    <th>ID</th>
                    <th>Navn</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="product in products" :key="product.id">
                    <td>
                        <router-link :to="productRoute(product.id)">{{product.id}}</router-link>
                    </td>
                    <td>
                        {{product.name}}
                    </td>
                    <td>
                        <app-button @click="addToCart(product)">Legg til</app-button>
                    </td>
                </tr>
                <tr>
                    <td colspan="3">
                        <app-button @click.prevent="newProduct">Nytt produkt</app-button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
    "use strict";

    import Vue from "vue";
    import {productApi} from "@/api/productApi";
    import Wait from "../components/shared/Wait.vue";
    import Component from "vue-class-component";
    import {IProductName} from "@/domain/product";
    import {RawLocation} from "vue-router";
    import {RouteNames} from "@/router";
    import {shoppingListApi} from "@/api/shoppingListApi";
    import AppButton from "@/components/shared/AppButton.vue";
    import {EventBus, EventBusEvents} from "@/EventBus";
    import {NotificationType} from "@/domain/notification";

    @Component({
        name: "products",
        components: {
            AppButton,
            Wait
        }
    })
    export default class Products extends Vue {

        //** DATA FIELDS

        loading: boolean = false;
        products: IProductName[] = [];

        //** LIFECYCLE

        async created(): Promise<void> {
            this.loading = true;
            this.products = await productApi.getProducts();
            this.loading = false;
        }

        //** METHODS

        protected newProduct(): void {
            this.$router.push({name: RouteNames.NEW_PRODUCT});
        }

        protected productRoute(id: number): RawLocation {
            return {
                name: RouteNames.PRODUCT,
                params: { id: id.toString(10) }
            };
        }

        protected async addToCart(product: IProductName): Promise<void> {
            if (this.$store.shoppingList == null) {
                this.$store.shoppingList = await shoppingListApi.getShoppingList();
            }

            this.$store.shoppingList.entries.push({
                product: {
                    id: product.id,
                    name: product.name
                },
                amount: 1 // TODO - Let user choose amount..
            });

            EventBus.$emit(EventBusEvents.DISPLAY_NOTIFICATION, {
                message: `${product.name} (${product.id}) lagt til i handlekurv`
            });

            try {
                await shoppingListApi.saveShoppingList(this.$store.shoppingList);
            } catch (e) {
                EventBus.$emit(EventBusEvents.DISPLAY_NOTIFICATION, {
                    message: e.toString(),
                    type: NotificationType.ERROR
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .products {
        width: 100%;

        &__inner-view {
            padding: 20px;
        }

    }
</style>
