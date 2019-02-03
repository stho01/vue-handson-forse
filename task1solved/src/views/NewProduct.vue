<template>
    <div class="new-product">
        <h1>Nytt produkt</h1>
        <wait v-if="saving">Vennligst vent mens produktet lagres...</wait>
        <product-editor v-else :product="product" @save="save" @cancel="cancel" />
        <error v-if="errorMessage != null" :message="errorMessage"></error>
    </div>
</template>

<script lang="ts">
    import Vue from "vue"
    import Component from "vue-class-component"
    import {IProduct} from "@/domain/product";
    import {IProductDto} from "@/dto/product";
    import {productApi} from "@/api/productApi";
    import Wait from "@/components/Wait.vue";
    import Error from "@/components/Error.vue";
    import ProductEditor from "@/components/ProductEditor.vue";

    @Component({
        name: "new-product",
        components: {
            ProductEditor,
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
