<template>
    <div id="app" class="app">
        <div class="app__header">
            <div class="wrapper">
                <router-link :to="{ name: 'home' }">
                    <img src="./assets/logo.svg" alt="Forse logo" class="app__logo">
                </router-link>
                <nav>
                    <router-link :to="{ name: RouteNames.HOME }" exact title="Forside">Forside</router-link>
                    <router-link :to="{ name: RouteNames.PRODUCTS }" title="Produkter">Produkter</router-link>
                </nav>
            </div>
        </div>
        <router-view/>
    </div>
</template>

<style lang="scss" scoped>
    .app {
        @include font-regular();
        text-align: center;
        color: #222;

        &__logo {
            max-width: 80px;
            height: 70px;
            margin-right: 20px;
        }

        &__header {
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
                a {
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
            }
        }
    }
</style>
