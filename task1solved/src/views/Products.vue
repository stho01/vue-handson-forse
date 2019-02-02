<template>
    <div class="products">
        <h1>Produkter</h1>
        <wait v-if="loading">Vennligst vent mens produkter laster inn...</wait>
        <div v-else>
            <table>
                <thead>
                <tr>
                    <th colspan="2">Produkter</th>
                </tr>
                <tr>
                    <th>ID</th>
                    <th>Navn</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="product in products" :key="product.id">
                    <td>
                        <router-link :to="getProductRoute(product.id)">{{product.id}}</router-link>
                    </td>
                    <td>{{product.name}}</td>
                </tr>
                <tr>
                    <td colspan="2">
                        <button class="button" type="button" @click.prevent="newProduct">Nytt produkt</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
    "use strict";

    import Vue from "vue";
    import {productApi} from "@/api/productApi";
    import Wait from "../components/Wait.vue";
    import Component from "vue-class-component";
    import {IProductName} from "@/domain/product";
    import {RawLocation} from "vue-router";
    import {RouteNames} from "@/router";

    @Component({
        name: "products",
        components: {
            Wait
        }
    })
    export default class Products extends Vue {

        //** DATA FIELDS

        loading: boolean = false;
        products: IProductName[] = [];

        //** LIFECYCLE

        async created(): Promise<void> {
            this.loading = true;
            this.products = await productApi.getProducts();
            this.loading = false;
        }

        //** METHODS

        protected newProduct(): void {
            this.$router.push({name: RouteNames.NEW_PRODUCT});
        }

        protected getProductRoute(id: number): RawLocation {
            return {
                name: RouteNames.PRODUCT,
                params: { id: id.toString(10) }
            };
        }

    }
</script>

<style lang="scss" scoped>
    .products {
        width: 100%;

        &__inner-view {
            padding: 20px;
        }

    }
</style>
