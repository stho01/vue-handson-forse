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
    import Wait from "@/components/shared/Wait.vue";
    import Error from "@/components/shared/Error.vue";
    import ProductEditor from "@/components/product/ProductEditor.vue";
    import {RouteNames} from "@/router";
    import {EventBus} from "@/EventBus";
    import {NotificationEvents} from "@/components/notification/NotificationEvents";

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

        product: IProduct = this.createEmptyProduct();
        saving: boolean = false;
        errorMessage: string | null = null;

        //** METHODS

        protected async save(): Promise<void> {
            try {
                this.saving = true;

                const newProduct: IProductDto = this.createDto();
                await productApi.upsertProduct(newProduct);

                this.$router.replace({name: RouteNames.PRODUCTS});
                EventBus.$emit(NotificationEvents.DISPLAY, {
                    message: `${newProduct.name} lagt til i produktlisten`
                });

            } catch (e) {
                this.errorMessage = e.toString();

            } finally {
                this.saving = false;
                this.errorMessage = null;
                // Reset product in case of keep-alive usage..
                this.product = this.createEmptyProduct();

            }
        }

        protected createDto(): IProductDto {
            return {
                id: productApi.generateProductId(),
                name: this.product.name || "Nytt produkt",
                weight: this.product.weight || 0
            };
        }

        protected createEmptyProduct(): IProduct {
            return {
                id: "",
                name: "Nytt produkt",
                weight: 0
            };
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
