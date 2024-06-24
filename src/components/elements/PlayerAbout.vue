<template>
    <h1 class="flex flex-row flex-nowrap m-0" v-if="about">
        <a class="h-8 z-20" :href="about.brand.url">
            <img class="w-auto h-full object-cover rounded-l-lg" :src="about.image" :alt="about.title" />
        </a>
        <a class="bg-white rounded-r-lg h-8 leading-8 text-black pr-6 pl-4 z-20 bg-black-arrow bg-arrow-position bg-arrow-size bg-no-repeat"
            :href="about.brand.url" v-text="about.brand.title" />
        <a class="bg-white/50 rounded-r-lg h-8 leading-8 text-black pr-6 pl-4 z-10 -ml-2 bg-black-arrow bg-arrow-position bg-arrow-size bg-no-repeat"
            v-if="about.season" :href="about.season.url" v-text="about.season.title" />
        <span class="h-8 text-white leading-8 px-4 truncate cursor-default" v-text="about.title"
            @click.prevent="togglePopup" />
    </h1>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useDataStore } from '@/stores/data'

// Store defenition
const dataStore = useDataStore();

// Getters from store
const { about } = storeToRefs(dataStore);
</script>