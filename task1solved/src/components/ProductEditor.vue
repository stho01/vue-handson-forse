<template>
    <table class="product-editor">
        <thead>
        <tr>
            <th colspan="2">Produkt - {{ product.name }}</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <th>
                Navn
            </th>
            <td>
                <label>
                    <input type="text" v-model="product.name">
                </label>
            </td>
        </tr>
        <tr>
            <th>
                Vekt
            </th>
            <td>
                <label>
                    <input type="text" v-model.number="product.weight">
                </label>
            </td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
            <td colspan="2" class="button-cell">
                <button class="button" type="button" @click="cancel">Avbryt</button>
                <button class="button" type="button" @click="save">Lagre</button>
            </td>
        </tr>
        </tfoot>
    </table>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component, Prop} from "vue-property-decorator";
    import {IProduct} from "@/domain/product";

    @Component
    export default class ProductEditor extends Vue {

        //** PROPS:

        @Prop({required: true})
        product !: IProduct;

        //** EVENT HANDLERS:

        protected save(event: Event): void {
            this.$emit("save");
        }

        protected cancel(event: Event): void {
            this.$emit("cancel");
        }

    }
</script>
<style scoped lang="scss">
    .product-table {}
</style>