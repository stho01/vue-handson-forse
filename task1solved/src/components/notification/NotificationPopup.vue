<template>
    <div class="notification-popup" v-on="$listeners">
        {{notification.message}}
    </div>
</template>
<script lang="ts">
    import Vue from "vue";
    import {Component, Prop} from "vue-property-decorator";
    import INotification from "@/domain/notification";

    @Component({
        name: "notification-popup"
    })
    export default class NotificationPopup extends Vue {

        @Prop({required: true})
        notification: INotification;

    }
</script>
<style scoped lang="scss">
    .notification-popup {
        padding: 10px 30px;
        background: rgba($color-base, .5);
        border-radius: 3px;
        font-size: 14px;
        width: 300px;
        min-height: 75px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>