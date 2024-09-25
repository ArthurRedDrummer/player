<template>
	<video ref="main" class="fixed top-0 left-0 w-full h-full z-20" @canplay="hideLoader" @waiting="showLoader"
		@timeupdate="setPosition" />
	<img class="fixed top-0 left-0 w-full h-full z-10 object-contain" v-if="preview" :src="preview" alt="" />
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { usePlayerStore } from '@/stores/player'
import { useDataStore } from '@/stores/data'
import { useLoaderStore } from '@/stores/loader'
import { storeToRefs } from 'pinia'

const main = ref(null)
const playerStore = usePlayerStore()
const dataStore = useDataStore()
const loaderStore = useLoaderStore()

const { source, preview } = storeToRefs(dataStore)

const { set, init, setPosition } = playerStore
const { showLoader, hideLoader } = loaderStore

onMounted(async () => {
	await set({
		main: main.value,
	})
})

watchEffect(async () => {
	if (source.value) {
		await init({
			source: source.value,
		})
	}
})
</script>
