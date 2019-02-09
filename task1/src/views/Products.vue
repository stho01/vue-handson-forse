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

                <!--
                TODO: List ut produkter
                <tr>
                    <td>
                        Produkt id
                    </td>
                    <td>
                        Produkt navn
                    </td>
                    <td>
                        <app-button>Legg til</app-button>
                    </td>
                </tr>
                -->

                <tr>
                    <td colspan="3">
                        <app-button>Nytt produkt</app-button>
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
    import Wait from "../components/shared/Wait.vue";
    import Component from "vue-class-component";
    import {IProductName} from "@/domain/product";
    import AppButton from "@/components/shared/AppButton.vue";
    import {productApi} from "@/api/productApi";
    import {RawLocation} from "vue-router";
    import {RouteNames} from "@/router";
    import {shoppingListApi} from "@/api/shoppingListApi";
    import {EventBus, EventBusEvents} from "@/EventBus";
    import {NotificationType} from "@/domain/notification";
    import {delay} from "@/api/delay";
    import Error from "@/components/shared/Error.vue";

    @Component({
        name: "products",
        components: {
            Error,
            AppButton,
            Wait
        }
    })
    export default class Products extends Vue {

        //** DATA FIELDS

        loading: boolean = true;

        //** LIFECYCLE

        async created(): Promise<void> {

            // OPPGAVE #1
            // 1.A). Hent liste med produkter fra productApi og sett listen til en data variabel.
            // 1.B) Sett opp markup for utlisting av produkter.

        }

        //** METHODS

        protected newProduct(): void {
            // Redirect user to New Product page.
        }

        protected async addToCart(product: IProductName): Promise<void> {
            // Add product to cart.
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
