<template>
    <div class="player-popup">
        <div class="player-popup-window">
            <header class="player-popup-header">
                <button class="button-close" @click.prevent="togglePopup"></button>
            </header>
            <div class="player-popup-icon"></div>
            <h2 class="player-popup-title">
                {{ data?.title }}
            </h2>
            <div class="player-popup-control" v-if="showControl">
                <button class="button-full-primary">Action</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { usePopupStore } from '@/stores/popup'

const popupStore = usePopupStore();
const { data } = storeToRefs(popupStore);

const { togglePopup } = popupStore;

const showControl = computed(() => data?.buttons && data?.buttons?.length)
</script>