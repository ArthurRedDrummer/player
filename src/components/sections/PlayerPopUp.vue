<template>
    <div class="fixed top-0 left-0 w-[100%] h-[100%] bg-black bg-opacity-50 z-20 flex justify-start items-center">
        <div class="m-auto bg-white p-6 rounded-md min-w-80">
            <header class="flex flex-row justify-end items-center">
                <button class="button-close" @click.prevent="togglePopup"></button>
            </header>
            <div class="flex bg-transparent bg-popup-warning bg-cover bg-center mx-auto mb-4 h-16 w-16"></div>
            <h2 class="text-black text-center">
                {{ data?.title }}
            </h2>
            <div class="flex flex-col gap-2 mt-4" v-if="showControl">
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