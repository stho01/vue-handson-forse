"use strict";

import Vue from "vue";
import Router from "vue-router";

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
        component: () => import("@/views/NewProduct.vue")
    },{
        name: RouteNames.PRODUCT,
        path: "/product/:id",
        component: () => import("@/views/Product.vue"),
        props: true
    },{
        path: "/product",
        component: () => import("@/views/Products.vue"),
        name: RouteNames.PRODUCTS,
    }, {
        path: "/",
        component: () => import("@/views/Home.vue"),
        name: RouteNames.HOME
    }, {
        path: "*",
        component: () => import("@/views/Http404NotFound.vue")
    }]
});
