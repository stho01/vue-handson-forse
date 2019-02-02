"use strict";

import Vue from "vue";
import Router from "vue-router";
import Products from "@/views/Products.vue";
import Product from "@/views/Product.vue";
import Http404NotFound from "@/views/Http404NotFound.vue";
import Home from "@/views/Home.vue";
import NewProduct from "@/views/NewProduct.vue";

export enum RouteNames {
    HOME = "home",
    PRODUCT = "product",
    NEW_PRODUCT = "new-product",
    PRODUCTS = "products"
}

Vue.use(Router);

export const router = new Router({
    mode: "history",
    linkActiveClass: "active",
    linkExactActiveClass: "active-exact",
    routes: [{
        name: RouteNames.NEW_PRODUCT,
        path: "/product/new",
        component: NewProduct
    },{
        name: RouteNames.PRODUCT,
        path: "/product/:id",
        component: Product,
        props: true
    },{
        path: "/product",
        component: Products,
        name: RouteNames.PRODUCTS,
    }, {
        path: "/",
        component: Home,
        name: RouteNames.HOME
    }, {
        path: "*",
        component: Http404NotFound
    }]
});
