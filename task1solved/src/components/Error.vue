<template>
    <div class="error">
        <slot :message="message">{{message}}</slot>
    </div>
</template>
<script lang="ts">
    export default {
        props: ["message"]
    }
</script>
