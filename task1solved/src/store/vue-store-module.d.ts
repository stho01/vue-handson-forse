import {IStore} from "@/store/Store";

declare module 'vue/types/vue' {
    interface Vue {
        $store: IStore;
    }
}