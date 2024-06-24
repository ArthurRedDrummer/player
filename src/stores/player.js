import Hls from 'hls.js'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('playerStore', () => {
	const currentPosition = ref(0)
	const isPlaying = ref(false)
	const mainPlayer = ref(null)

	const isPlayerPlaying = computed(() => isPlaying.value)

	const $elems = computed(() => ({
		main: mainPlayer.value,
	}))

	const position = computed(() => currentPosition.value)

	const set = async ({ main }) => {
		mainPlayer.value = main
	}

	const init = async ({ source }) => {
		if (/audio/gi.test(source)) {
			mainPlayer.value.src = source
		} else {
			if (mainPlayer.value.canPlayType('application/vnd.apple.mpegurl')) {
				mainPlayer.value.src = source
			} else if (Hls.isSupported()) {
				let hls = new Hls()

				hls.loadSource(source)
				hls.attachMedia(mainPlayer.value)
			}
		}
	}

	const play = async () => {
		await mainPlayer.value.play()
		isPlaying.value = true
	}

	const pause = async () => {
		await mainPlayer.value.pause()
		isPlaying.value = false
	}

	const toggle = async () => {
		isPlaying.value ? pause() : play()
	}

	const rewind = async ({ position }) => {
		mainPlayer.value.currentTime = position
		currentPosition.value = position
	}

	const setVolume = async ({ volume }) => {
		mainPlayer.value.volume = volume
	}

	const setPosition = async () => {
		currentPosition.value = mainPlayer.value.currentTime.toFixed(0)
	}

	return {
		isPlayerPlaying,
		$elems,
		position,
		set,
		init,
		play,
		pause,
		toggle,
		rewind,
		setVolume,
		setPosition,
	}
})
