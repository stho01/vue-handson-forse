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
                <app-button @click="cancel">Avbryt</app-button>
                <app-button @click="save">Lagre</app-button>
            </td>
        </tr>
        </tfoot>
    </table>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component, Prop} from "vue-property-decorator";
    import {IProduct} from "@/domain/product";
    import AppButton from "@/components/shared/AppButton.vue";

    @Component({
        components: {AppButton}
    })
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