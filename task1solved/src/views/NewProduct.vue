<template>
    <div class="new-product">
        <h1>Nytt produkt</h1>
        <wait v-if="saving" message="Vennligst vent mens produktet lagres..."></wait>
        <table v-else>
            <tbody>
            <tr>
                <th colspan="2">Produkt - {{product.name}}</th>
            </tr>
            <tr>
                <th>Name</th>
                <td><input type="text" v-model="product.name"></td>
            </tr>
            <tr>
                <th>Weight</th>
                <td><input type="text" v-model.number="product.weight"></td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
                <td></td>
                <td class="button-cell">
                    <button class="button" type="button" @click.prevent="cancel">Avbryt</button>
                    <button class="button" type="button" @click.prevent="save">Lagre</button>
                </td>
            </tr>
            </tfoot>
        </table>
        <error v-if="errorMessage != null" :message="errorMessage"></error>
    </div>
</template>

<script lang="ts">
    "use strict";

    import Vue from "vue"
    import Component from "vue-class-component"
    import {IProduct} from "@/domain/product";
    import {IProductDto} from "@/dto/product";
    import {productApi} from "@/api/productApi";
    import Wait from "@/components/Wait.vue";
    import Error from "@/components/Error.vue";

    @Component({
        name: "new-product",
        components: {
            Error,
            Wait
        }
    })
    export default class NewProduct extends Vue {

        //** DATA FIELDS

        product: IProduct = {
            id: "",
            name: "Nytt produkt",
            weight: 0
        };
        saving: boolean = false;
        errorMessage: string | null = null;

        //** METHODS

        protected async save(): Promise<void> {
            try {
                this.saving = true;

                const product: IProductDto = {
                    id: productApi.generateProductId(),
                    name: this.product.name || "Nytt produkt",
                    weight: this.product.weight || 0
                };

                await productApi.upsertProduct(product);

                this.$router.replace({name: "products"});
            } catch (e) {
                this.errorMessage = e.toString();
            } finally {
                this.saving = false;
                this.errorMessage = null;
            }
        }

        protected cancel(): void {
            this.$router.back();
        }
    }
</script>

<style scoped lang="scss">
    .new-product {

    }
</style>
