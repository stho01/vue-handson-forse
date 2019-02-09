"use strict";

import Vue from "vue";
import Router from "vue-router";

export enum RouteNames {
    HOME = "home",
    PRODUCT = "product",
    NEW_PRODUCT = "new-product",
    PRODUCTS = "products",
    SHOPPING_CART = "shopping-cart"
}

Vue.use(Router);

export const router = new Router({
    mode: "history",
    linkActiveClass: "active",
    linkExactActiveClass: "active-exact",
    routes: [{
        name: RouteNames.NEW_PRODUCT,
        path: "/products/new",
        component: () => import("@/views/NewProduct.vue")
    },{
        name: RouteNames.PRODUCT,
        path: "/products/:id",
        component: () => import("@/views/Product.vue"),
        props: true
    },{
        path: "/products",
        component: () => import("@/views/Products.vue"),
        name: RouteNames.PRODUCTS,
    }, {
        path: "/shopping-cart",
        component: () => import("@/views/ShoppingCart.vue"),
        name: RouteNames.SHOPPING_CART
    }, {
        path: "/",
        component: () => import("@/views/Home.vue"),
        name: RouteNames.HOME
    }, {
        path: "*",
        component: () => import("@/views/Http404NotFound.vue")
    }]
});
