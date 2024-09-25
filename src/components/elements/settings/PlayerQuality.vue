<template>
  <div ref="target" class="relative select-none" v-if="levels?.length">
    <button class="button-options" @click.prevent="toggleList" />
    <ul v-if="isQualityListVisible"
      class="absolute bottom-full right-0 mb-3 flex flex-col bg-black/50 rounded-md overflow-hidden text-white">
      <li v-for="level in levels" :key="level.key">
        <button class="flex flex-row gap-2 text-sm text-center w-full px-4 py-2 hover:bg-white/20" :class="{
          'bg-white text-black': level.isActive
        }" @click.prevent="settingsStore.changeQuality(level.value)">
          <span v-text="level.title" />
          <sub class="text-accent-red" v-if="level.isHD">HD</sub>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useSettingsStore } from '@/stores/settings'
import { storeToRefs } from 'pinia'

const target = ref(null);
const settingsStore = useSettingsStore();

const { levels, isQualityListVisible } = storeToRefs(settingsStore);

function toggleList() {
  return isQualityListVisible.value
    ? settingsStore.hideQualityList()
    : settingsStore.showQualityList();
}

onClickOutside(target, () => {
  if (isQualityListVisible.value) {
    settingsStore.hideQualityList(); 
  }
})
</script>