<template>
  <n-message-provider>
    <Main />
  </n-message-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Main from '@/components/Main.vue'

export default defineComponent({
  name: 'App',
})
</script>

<style lang="scss">
 html, body {
   background-color: #55aa7f; //#e8eef4;
 }
</style>
