<template>
  <time class="text-xs text-white font-monospace cursor-pointer" @click.prevent="switchType" v-text="time" />
</template>

<script setup>
import moment from 'moment'
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useDataStore } from '@/stores/data'
import { usePlayerStore } from '@/stores/player'

const types = [
  'passed',
  'left',
  'full'
]

const dataStore = useDataStore();
const playerStore = usePlayerStore();

const { duration } = storeToRefs(dataStore);
const { position } = storeToRefs(playerStore);

const currentType = ref(0);

const time = computed(() => {
  let _duration = moment.utc(duration.value * 1000);
  let _passed = moment.utc(position.value * 1000);
  let _left = moment.utc((duration.value - position.value) * 1000);
  let format = _duration.hours() > 0 ? 'HH:mm:ss' : 'mm:ss';

  if (types[currentType.value] === 'passed') {
    return _passed.format(format)
  }

  if (types[currentType.value] === 'left') {
    return `-${_left.format(format)}`
  }

  if (types[currentType.value] === 'full') {
    return `${_passed.format(format)} / ${_duration.format(format)}`
  }
});

function switchType() {
  currentType.value = currentType.value >= types.length - 1 ? 0 : currentType.value + 1;
}

</script>