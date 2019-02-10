<template>
    <div class="notification-popup-list">
        <transition-group name="fade" tag="div">
            <notification-popup class="notification-popup"
                v-for="wrapper in notificationsReversed"
                :key="wrapper.id"
                :notification="wrapper.notification"
                @click="deleteNotification(notification)" />
        </transition-group>
    </div>
</template>
<script lang="ts">
    import Vue from "vue";
    import {Component, Inject, Prop} from "vue-property-decorator";
    import {IEventBus, EventBusEvents} from "@/EventBus";
    import INotification from "../../domain/notification";
    import NotificationPopup from "@/components/notification/NotificationPopup.vue";
    import uuidv4 from "@/utils/uuidv4";

    interface INotificationWrapper {
        id: string;
        notification: INotification;
    }

    @Component({
        name: "notification-popup-list",
        components: {NotificationPopup}
    })
    export default class NotificationPopupList extends Vue {

        //** PROPS

        @Prop({ default: 3000 })
        displayTime !: number;

        @Inject("")
        eventBus !: IEventBus | null = null;

        //** DATA FIELDS:

        notifications: INotificationWrapper[] = [];

        //** Computed

        get notificationsReversed(): INotificationWrapper[] {
            return this.notifications.reverse();
        }

        //** LIFECYCLE HOOKS:

        created(): void {
            if (this.eventBus != null) {
                this.eventBus.$on(EventBusEvents.DISPLAY_NOTIFICATION, this.onDisplayNotification.bind(this));
            }
        }

        destroyed(): void {
            if (this.eventBus != null) {
                this.eventBus.$off(EventBusEvents.DISPLAY_NOTIFICATION, this.onDisplayNotification.bind(this));
            }
        }

        //** METHODS:

        deleteNotification(wrapper: INotificationWrapper): void {
            const index: number = this.notifications.indexOf(wrapper);

            if (index >= 0) {
                this.notifications.splice(index, 1);
            }
        }

        //** EVENT HANDLERS:

        private onDisplayNotification(notification: INotification): void {
            const wrapper: INotificationWrapper = {
                id: uuidv4(),
                notification
            };

            this.notifications.push(wrapper);

            setTimeout(() => this.deleteNotification(wrapper), this.displayTime);
        }
    }
</script>
<style scoped lang="scss">
    .notification-popup-list {
        display: flex;
        flex-direction: column-reverse;
        position: fixed;
        height: 0;
        bottom: 0;
        right: 0;

        /deep/ .notification-popup {
            margin: 3px;
            cursor: pointer;
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: all 1s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
        transform: translateY(30px);
    }
</style>