<template>
    <div class="product">
        <h1>Produkt</h1>
        <wait v-if="loading">{{loadingMessage}}</wait>
        <error v-else-if="product == null">{{errorMessage}}</error>
        <table v-else>
            <thead>
            <tr>
                <th colspan="2">
                    Produkt - {{ product.name }}
                </th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th>
                    Navn
                </th>
                <td>
                    <!-- TODO: Edit product name -->
                    {{product.name}}
                </td>
            </tr>
            <tr>
                <th>
                    Vekt
                </th>
                <td>
                    <!-- TODO: Edit product weight -->
                    {{product.weight}}
                </td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
                <td colspan="2" class="button-cell">

                </td>
            </tr>
            </tfoot>
        </table>
    </div>
</template>

<script lang="ts">
    "use strict";

    //********************************************

    import Vue from "vue";
    import Component from "vue-class-component";
    import {IProduct} from "@/domain/product";
    import Wait from "@/components/shared/Wait.vue";
    import Error from "@/components/shared/Error.vue";
    import BackButton from "@/components/shared/BackButton.vue";
    import AppButton from "@/components/shared/AppButton.vue";
    import {delay} from "@/api/delay";
    import {Prop, Watch} from "vue-property-decorator";
    import {productApi} from "@/api/productApi";
    import {IProductDto} from "@/dto/product";

    //********************************************

    @Component({
        name: "product",
        components: {
            AppButton,
            BackButton,
            Wait,
            Error
        }
    })
    export default class Product extends Vue {

        //** PROPS



        //** DATA

        product: IProduct | null = null;
        loading: boolean = false;
        loadingMessage: string | null = null;
        errorMessage: string = "";

        //** LIFECYCLE

        /**
         * Called after vue component is created.
         */
        async created(): Promise<void> {
            this._showLoader("Laster inn produkt...");

            /*
                1. Sett opp id prop
                2. Hent produktet fra productApi
             */

            await delay(1000);
            this._showError("Not implemented");
        }


        //** UTILS....

        /**
         * Shows the loader to the screen.
         * @param message
         * @private
         */
        private _showLoader(message: string): void {
            this.loading = true;
            this.loadingMessage = message;
        }

        /**
         * Hides the loader from the screen.
         * @private
         */
        private _hideLoader(): void {
            this.loading = false;
            this.loadingMessage = null;
        }

        /**
         * Shows a error message on the screen.
         * @param message
         * @private
         */
        private _showError(message: string): void {
            this.errorMessage = message;
            this.product = null;
        }
    }
</script>

<style lang="scss" scoped>
    .product {
        table {
            input {
                width: 100%;
            }

            button {
                margin-left: auto;
                display: inline-block;
            }
        }
    }
</style>
