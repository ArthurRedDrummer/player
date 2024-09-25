<template>
    <div class="flex flex-row justify-start items-center gap-4">
        <button class="button-prev" v-if="hasPlaylist" />
        <button :class="{
            'button-play': !isPlayerPlaying,
            'button-pause': isPlayerPlaying
        }" @click.stop.prevent="toggle" />
        <button class="button-next" v-if="hasPlaylist" />
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useDataStore } from '@/stores/data'
import { usePlayerStore } from '@/stores/player'

// Store defenitions
const dataStore = useDataStore();
const playerStore = usePlayerStore();

// Getters from store
const { hasPlaylist } = storeToRefs(dataStore);
const { isPlayerPlaying } = storeToRefs(playerStore);

// Actions from store
const { toggle } = playerStore;
</script>