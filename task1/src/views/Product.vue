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
                </td>
            </tr>
            <tr>
                <th>
                    Vekt
                </th>
                <td>
                    <!-- TODO: Edit product weight -->
                </td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
                <td colspan="2" class="button-cell">
                    <!-- TODO: Handle cancel and save -->
                    <app-button>Avbryt</app-button>
                    <app-button>Lagre</app-button>
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
    import {Prop, Watch} from "vue-property-decorator";
    import {IProduct} from "@/domain/product";
    import Wait from "@/components/shared/Wait.vue";
    import Error from "@/components/shared/Error.vue";
    import BackButton from "@/components/shared/BackButton.vue";
    import ProductEditor from "@/components/product/ProductEditor.vue";
    import AppButton from "@/components/shared/AppButton.vue";
    import {delay} from "@/api/delay";
    import {productApi} from "@/api/productApi";
    import {IProductDto} from "@/dto/product";
    import {EventBus, EventBusEvents} from "@/EventBus";

    //********************************************

    @Component({
        name: "product",
        components: {
            AppButton,
            ProductEditor,
            BackButton,
            Wait,
            Error
        }
    })
    export default class Product extends Vue {

        //** PROPS

        // TODO: #1 Product ID property.

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
            await this._fetchData();
        }

        //** WATCH

        /**
         * Listen to any route changes and update product data.
         */
        @Watch("$route")
        private async _onRouteChanged(): Promise<void> {
            await this._fetchData();
        }

        //** METHODS

        /**
         * Fetch product data from server and assign to product field.
         * @private
         */
        private async _fetchData(): Promise<void> {
            this.product = await this._loading(
                "Vennligst vent mens produktet laster inn...",
                async () => {

                    // TODO: #2 Fetch product data from api
                    await delay(1000);
                    throw "Not implemented...";

                    // noinspection UnreachableCodeJS
                    return null;
                }
            );
        }

        /**
         * Save current product state to server.
         */
        async save(): Promise<void> {
            await this._loading(
                "Vennligst vent mens produktet lagres...",
                async () => {

                    // TODO: #3 Save current product with productApi

                    await delay(1000);


                });
        }

        /**
         * Displays a loader before calling the asynchronous method
         * and hides it whenever the task is done with it's work.
         * @param message
         * @param action
         * @private
         */
        private async _loading<T>(message: string, action: Promise<T> | { (): Promise<T> }): Promise<T | null> {
            try {
                this._showLoader(message);

                if (typeof action === "function") {
                    return await action();

                } else {
                    return await action;
                }

            } catch (e) {
                this._showError(e.toString());
                return null;

            } finally {
                this._hideLoader();
            }
        }

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
                display: block;
            }
        }
    }
</style>
