<template>
  <div class="relative flex flex-col">
    <button :class="isFullscreen ? 'button-fullscreen-off' : 'button-fullscreen-on'"
      @click.prevent="toggleFullscreen" />
  </div>
</template>

<script setup>
import { useSettingsStore } from '@/stores/settings'
import { storeToRefs } from 'pinia'

const settingsStore = useSettingsStore();

const { isFullscreen } = storeToRefs(settingsStore);

const { toggleFullscreen } = settingsStore;
</script>