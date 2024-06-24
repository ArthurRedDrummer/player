<template>
    <div class="flex flex-row justify-start items-center gap-2">
        <button :class="buttonClass" @click="toggleMute" />
        <slider v-model="volume" width="120px" color="#FFFFFF" track-color="rgba(255,255,255,0.2)"
            :always-show-handle="true" :handle-scale="2" :min="0" :max="1" :step="0.1" @change="toggleVolume" />
    </div>
</template>

<script setup>
import slider from 'vue3-slider'
import { ref, computed, onMounted } from 'vue'
import { useInfoStore } from '@/stores/info'
import { usePlayerStore } from '@/stores/player'
import { storeToRefs } from 'pinia';

const infoStore = useInfoStore();
const playerStore = usePlayerStore();

const { info } = storeToRefs(infoStore);
const { setVolume } = playerStore;

const volume = ref(info.value.volume);
const previous = ref(0);

const valid = computed(() => +volume.value.toFixed(1));
const isMuted = computed(() => valid.value === 0);
const buttonClass = computed(() => isMuted.value ? 'button-mute-on' : 'button-mute-off');

const toggleVolume = () => {
    setVolume({
        volume: valid.value
    })
}

const toggleMute = () => {
    if (valid.value !== 0) {
        previous.value = valid.value;
    }

    volume.value = isMuted.value ? previous.value : 0;
}

onMounted(() => {
    if (previous.value === 0) {
        previous.value = 0.6;
    }
    setVolume({
        volume: valid.value
    });
})
</script>