"use strict";

import Vue from "vue";
import Router from "vue-router";
import Products from "@/views/Products.vue";
import Product from "@/views/Product.vue";
import Http404NotFound from "@/views/Http404NotFound.vue";
import Home from "@/views/Home.vue";
import NewProduct from "@/views/NewProduct.vue";

Vue.use(Router);

export const router = new Router({
    mode: "history",
    linkActiveClass: "active",
    linkExactActiveClass: "active-exact",
    routes: [{
        name: "newproduct",
        path: "/product/new",
        component: NewProduct
    },{
        name: "product",
        path: "/product/:id",
        component: Product,
        props: true
    },{
        path: "/product",
        component: Products,
        name: "products",
    }, {
        path: "/",
        component: Home,
        name: "home"
    }, {
        path: "*",
        component: Http404NotFound
    }]
});
