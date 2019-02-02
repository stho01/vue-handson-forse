<template>
    <div class="home">
        <h1>Forside</h1>
        <div class="home__shortcuts">
            <router-link :to="{ name: RouteNames.PRODUCTS }">Produkter</router-link>
            <router-link :to="{ name: RouteNames.NEW_PRODUCT }">Nytt Produkt</router-link>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue"
    import Component from "vue-class-component"

    @Component({
        name: "home"
    })
    export default class Home extends Vue {

    }
</script>

<style scoped lang="scss">
    .home {

        &__shortcuts {
            display: flex;
            flex-wrap: wrap;
            max-width: 1024px;
            margin: 30px auto;

            > a {
                $background-color: $color-base;
                width: calc(33.33% - 20px);
                font-size: 30px;
                text-align: center;
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 300px;
                transition: background-color 150ms ease-out;
                will-change: background-color;
                margin: 10px;
                background-color: black;

                &:hover {
                    background-color: $background-color;
                }
            }
        }
    }
</style>
