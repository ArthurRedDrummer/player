<template>
    <slider class="flex basis-full" v-if="duration" v-model="current" :min="0" :max="duration" :step="1" color="#FFFFFF"
        track-color="rgba(255,255,255,0.2)" :always-show-handle="true" :handle-scale="2" @drag-start="dragStart"
        @drag-end="dragEnd" />
</template>

<script setup>
import slider from 'vue3-slider'
import { ref, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useDataStore } from '@/stores/data'
import { usePlayerStore } from '@/stores/player'

const dataStore = useDataStore();
const playerStore = usePlayerStore();

const { duration } = storeToRefs(dataStore);
const { position } = storeToRefs(playerStore);

const { rewind } = playerStore;

const current = ref(0);
const watchPosition = ref(true);

function dragStart() {
    watchPosition.value = false;
}

function dragEnd() {
    rewind({
        position: current.value
    });

    watchPosition.value = true;
}

watchEffect(() => {
    if (position && position.value && watchPosition.value) {
        current.value = +position.value;
    }
});
</script>