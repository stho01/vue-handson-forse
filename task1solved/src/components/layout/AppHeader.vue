<template>
    <div class="app-header">
        <div class="wrapper">
            <router-link :to="{ name: RouteNames.HOME }">
                <img src="@/assets/logo.svg" alt="Forse logo" class="app-header__logo">
            </router-link>
            <nav>
                <div class="app-header__nav-links">
                    <router-link :to="{ name: RouteNames.HOME }" exact title="Forside">Forside</router-link>
                    <router-link :to="{ name: RouteNames.PRODUCTS }" title="Produkter">Produkter</router-link>
                </div>
                <mini-cart class="app-header__cart" />
            </nav>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component} from "vue-property-decorator";
    import MiniCart from "@/components/shop/MiniCart.vue";
    @Component({
        components: {MiniCart}
    })
    export default class AppHeader extends Vue {

    }
</script>

<style scoped lang="scss">
    .app-header {
        padding: 15px 20px;
        margin-bottom: 60px;
        align-items: center;
        -webkit-box-shadow: 0 6px 5px 0 rgba(0, 0, 0, 0.09);
        -moz-box-shadow: 0 6px 5px 0 rgba(0, 0, 0, 0.09);
        box-shadow: 0 6px 5px 0 rgba(0, 0, 0, 0.09);
        background: white;

        .wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        nav {
            display: flex;
        }

        &__nav-links a {
            position: relative;
            text-transform: uppercase;
            padding: 5px 10px;
            margin: 0 10px;
            text-decoration: none;
            color: black;
            font-size: 18px;
            user-select: none;
            border: 1px solid transparent;
            border-radius: 3px;
            display: inline-block;
            text-align: center;

            &:after {
                content: attr(title);
                font-weight: bold;
                height: 0;
                display: block;
                overflow: hidden;
            }

            &:focus {
                border: 1px solid rgba($color-base, .2);
                outline: none;
            }

            &.active,
            &:hover {
                border: 1px solid $color-base;
                font-weight: bold;
            }
        }

        &__logo {
            max-width: 80px;
            height: 70px;
            margin-right: 20px;
        }

        &__cart {
            margin-left: 30px;
        }
    }
</style>