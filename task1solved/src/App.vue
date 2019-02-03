<template>
    <div id="app" class="app">
        <app-header />
        <router-view/>
        <button @click="pushNotification">Display Notification</button>
        <notification-popup-list />
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import AppHeader from "@/components/layout/AppHeader.vue";
    import {Component} from "vue-property-decorator";
    import NotificationPopupList from "@/components/notification/NotificationPopupList.vue";
    import {EventBus} from "@/EventBus";
    import {NotificationEvents} from "@/components/notification/NotificationEvents";

    @Component({
        components: {
            NotificationPopupList,
            AppHeader
        }
    })
    export default class App extends Vue {
        pushNotification() {
            EventBus.$emit(NotificationEvents.DISPLAY, {
                message: "Hello, World!"
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