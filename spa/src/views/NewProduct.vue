<template>
    <div class="new-product">
        <h1>Nytt produkt</h1>
        <wait v-if="saving">Vent mens produktet lagres...</wait>
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
                    <input type="text" v-model="product.name" />
                </td>
            </tr>
            <tr>
                <th>
                    Vekt
                </th>
                <td>
                    <input type="text" v-model.number="product.weight" />
                </td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
                <td colspan="2" class="button-cell">
                    <back-button />
                    <app-button @click="save">Lagre</app-button>
                </td>
            </tr>
            </tfoot>
        </table>
    </div>
</template>

<script lang="ts">
    import Vue from "vue"
    import Component from "vue-class-component"
    import {IProduct} from "@/domain/product";
    import {IProductDto} from "@/dto/product";
    import {productApi} from "@/api/productApi";
    import Wait from "@/components/shared/Wait.vue";
    import Error from "@/components/shared/Error.vue";
    import {RouteNames} from "@/router";
    import {EventBus, EventBusEvents} from "@/EventBus";
    import BackButton from "@/components/shared/BackButton.vue";
    import AppButton from "@/components/shared/AppButton.vue";


    @Component({
        name: "new-product",
        components: {
            Error,
            Wait,
            BackButton,
            AppButton
        }
    })
    export default class NewProduct extends Vue {

        //** DATA FIELDS

        product: IProduct = this.createEmptyProduct();
        saving: boolean = false;

        //** METHODS

        async save(): Promise<void> {
            this.saving = true;

            await productApi.upsertProduct({
                id: this.product.id,
                name: this.product.name,
                weight: this.product.weight
            });

            this.saving = false;
        }

        protected createEmptyProduct(): IProduct {
            return {
                id: "",
                name: "Nytt produkt",
                weight: 0
            };
        }
    }
</script>