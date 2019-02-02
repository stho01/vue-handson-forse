<template>
    <div class="product">
        <h1>Produkt</h1>
        <back-button />
        <wait v-if="loading">{{loadingMessage}}</wait>
        <error v-else-if="product == null">{{errorMessage}}</error>
        <table v-else>
            <tbody>
            <tr>
                <th colspan="2">Produkt - {{ product.name }}</th>
            </tr>
            <tr>
                <th>Navn</th>
                <td><input type="text" v-model="product.name"></td>
            </tr>
            <tr>
                <th>Vekt</th>
                <td><input type="text" v-model.number="product.weight"></td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
                <td></td>
                <td>
                    <button class="button" @click="save">Lagre</button>
                </td>
            </tr>
            </tfoot>
        </table>
    </div>
</template>

<script lang="ts">
    "use strict";

    import Vue from "vue";
    import Component from "vue-class-component";
    import {Prop, Watch} from "vue-property-decorator";
    import {productApi} from "@/api/productApi";
    import {IProduct} from "@/domain/product";
    import {IProductDto} from "@/dto/product";
    import Wait from "@/components/Wait.vue";
    import Error from "@/components/Error.vue";
    import BackButton from "@/components/BackButton.vue";
    
    @Component({
        name: "product",
        components: {
            BackButton,
            Wait,
            Error
        }
    })
    export default class Product extends Vue {

        //** PROPS

        @Prop()
        id: string;

        //** DATA

        loading: boolean = false;
        loadingMessage: string | null = null;
        product: IProduct | null = null;
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
            this.product = await this._load(
                    "Vennligst vent mens produktet laster inn...",
                    productApi.getProduct(this.id));
        }

        /**
         * Save current product state to server.
         */
        async save(): Promise<void> {
            if (this.product == null) {
                throw "Ingen produkt er valgt.";
            }

            const product: IProductDto = {
                id: this.product.id,
                name: this.product.name,
                weight: this.product.weight
            };

            await this._load(
                    "Vennligst vent mens produktet lagres...",
                    productApi.upsertProduct(product));
        }

        /**
         * Displays a loader before calling the asynchronous method
         * and hides it whenever the task is done with it's work.
         *
         * @param message
         * @param action
         * @private
         */
        private async _load<T>(message: string, action: Promise<T>): Promise<T|null> {
            try {
                this._showLoader(message);

                return await action;
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
