<template>
  <div ref="target" v-if="isSpeedChangeAvailable" class="relative select-none">
    <button class="button-speed text-sm font-bold" :class="{
      'active': isSpeedListVisible
    }" v-text="currentSpeed" @click.prevent="toggleList" />
    <ul
      class="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 flex flex-col bg-black/50 rounded-md overflow-hidden text-white"
      v-if="isSpeedListVisible && speed?.length">
      <li :class="{
        'bg-white text-black': item.isActive
      }" v-for="item in speed" :key="item.key">
        <button class="text-sm text-center block w-full px-4 py-2 hover:bg-white/20" v-text="item.title"
          @click.prevent="settingsStore.changeSpeed(item.title)" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useSettingsStore } from '@/stores/settings'
import { storeToRefs } from 'pinia';

const target = ref(null);

const settingsStore = useSettingsStore();

const { speed, currentSpeed, isSpeedListVisible, isSpeedChangeAvailable } = storeToRefs(settingsStore);

function toggleList() {
  return isSpeedListVisible.value
    ? settingsStore.hideSpeedList()
    : settingsStore.showSpeedList();
}

onClickOutside(() => {
  settingsStore.hideSpeedList();
})
</script>