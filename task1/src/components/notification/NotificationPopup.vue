<template>
    <div class="notification-popup" v-on="$listeners" :class="getTypeClass()">
        {{notification.message}}
    </div>
</template>
<script lang="ts">
    import Vue from "vue";
    import {Component, Prop} from "vue-property-decorator";
    import INotification, {NotificationType} from "@/domain/notification";

    @Component({
        name: "notification-popup"
    })
    export default class NotificationPopup extends Vue {

        //** PROPS:

        @Prop({required: true})
        notification: INotification;

        //** METHODS:

        protected getTypeClass(): string {
            const baseClass: string = "notification-popup";
            const typeMap: Record<number, string> = {
                [NotificationType.MESSAGE]: `${baseClass}--message`,
                [NotificationType.ERROR]: `${baseClass}--error`
            };

            return typeMap[this.notification.type as number];
        }
    }
</script>
<style scoped lang="scss">
    .notification-popup {
        padding: 10px 30px;
        background: $color-base;
        border-radius: 3px;
        font-size: 14px;
        width: 300px;
        min-height: 75px;
        display: flex;
        align-items: center;
        justify-content: center;


        &--message {}
        &--error {
            background-color: #ff687e;
        }
    }
</style>