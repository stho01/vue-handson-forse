<template>
    <router-link :to="{ name: RouteNames.SHOPPING_CART }" class="shopping-cart" title="Handlekurv">
        <span class="shopping-cart__count" v-if="count > 0">{{count}}</span>
        <span class="shopping-cart__icon">
            <img src="@/assets/images/shopping-cart.svg" alt="Handlekurv" />
        </span>
    </router-link>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component} from "vue-property-decorator";

    @Component({
        name: "mini-cart"
    })
    export default class MiniCart extends Vue {

        //** COMPUTED:

        get count(): number {
            if (this.$store.shoppingList == null) {
                return 0;
            } else {
                return (this.$store.shoppingList.entries || []).length;
            }
        }
    }
</script>

<style scoped lang="scss">
    .shopping-cart {
        position: relative;
        width: 25px;
        height: 25px;

        &__icon {
            img {
                display: block;
                width: 25px;
                height: 25px;
            }
        }

        &__count {
            position: absolute;
            right: -7px;
            top: -7px;
            display: flex;
            align-content: center;
            align-items: center;
            justify-content: center;
            width: 18px;
            height: 18px;
            font-size: 10px;
            border-radius: 100px;
            color: white;
            background: $color-base;
        }

        &::before {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            background-color: transparent;
            width: 40px;
            height: 40px;
            border-radius: 100%;
            transition: 100ms background-color;
        }

        &:hover::before {
            background-color: rgba(black, .2);
        }
    }
</style>