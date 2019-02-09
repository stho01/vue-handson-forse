<template>
    <div class="notification-popup" v-on="$listeners" :class="getTypeClass()">
        {{notification.message}}
    </div>
</template>
<script lang="ts">
    import Vue from "vue";
    import {Component, Prop} from "vue-property-decorator";
    import INotification, {NotificationType} from "@/domain/notification";

    const baseClass: string = "notification-popup";
    const typeMap: Record<number, string> = {
        [NotificationType.MESSAGE]: `${baseClass}--message`,
        [NotificationType.ERROR]: `${baseClass}--error`
    };

    @Component({
        name: "notification-popup"
    })
    export default class NotificationPopup extends Vue {

        //** PROPS:

        @Prop({required: true})
        notification: INotification;

        //** DATA

        //** METHODS:

        protected getTypeClass(): string {
            return typeMap[this.notification.type as number];
        }
    }
</script>
<style scoped lang="scss">
    .notification-popup {
        padding: 10px 30px;
        background: $color-base;
        color: white;
        border-radius: 3px;
        font-size: 15px;
        width: 300px;
        min-height: 75px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;


        &--message {}
        &--error {
            background-color: #ff687e;
        }
    }
</style>