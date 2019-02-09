<template>
    <div id="app" class="app">
        <app-header />
        <router-view/>
        <notification-popup-list />
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import AppHeader from "@/components/layout/AppHeader.vue";
    import {Component} from "vue-property-decorator";
    import NotificationPopupList from "@/components/notification/NotificationPopupList.vue";
    import {shoppingListApi} from "@/api/shoppingListApi";

    @Component({
        components: {
            NotificationPopupList,
            AppHeader
        }
    })
    export default class App extends Vue {

        created(): void {

            shoppingListApi.getShoppingList()
                .then(list => {
                    this.$store.shoppingList = list;
                });

        }

    }
</script>

<style lang="scss" scoped>
    .app {
        @include font-regular();
        text-align: center;
        color: #222;
    }
</style>