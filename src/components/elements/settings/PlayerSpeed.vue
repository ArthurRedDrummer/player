<template>
  <div v-if="isAvailable" class="relative">
    <button class="button-speed text-sm font-bold" :class="{
      'active': isVisible
    }" v-text="current" @click.prevent="toggleList" />
    <ul
      class="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 flex flex-col bg-black/50 rounded-md overflow-hidden text-white"
      v-if="isVisible && speedList && speedList.length">
      <li :class="{
        'bg-white text-black': item.isActive
      }" v-for="item in speedList" :key="item.key">
        <button class=" text-sm text-center block w-full px-4 py-2 hover:bg-white/20" v-text="item.title"
          @click.prevent="changeSpeed(item.title)" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePlayerStore } from '@/stores/player'
import { useInfoStore } from '@/stores/info';
import { storeToRefs } from 'pinia';

const playerStore = usePlayerStore();
const infoStore = useInfoStore();

const { setSpeed } = playerStore;
const { info } = storeToRefs(infoStore);

const current = ref(1);
const values = ref([0.5, 0.75, 1, 1.5, 2]);
const isVisible = ref(false);

const speedList = computed(() => values.value.map(item => {
  return {
    key: `speed-list-${item}`,
    title: item,
    isActive: item === current.value
  }
}));

const isAvailable = computed(() => {
  if (info.value.type === 'live') {
    return false;
  }

  return true;
})

function toggleList() {
  isVisible.value = !isVisible.value;
}

function changeSpeed(value) {
  current.value = value;

  setSpeed(current.value);
  toggleList();
}
</script>