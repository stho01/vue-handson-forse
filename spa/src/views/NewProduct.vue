<template>
    <div class="new-product">
        <h1>Nytt produkt</h1>
        <wait v-if="saving">Vent mens produktet lagres...</wait>
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

            // TODO: Dispatch new product to "server"

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