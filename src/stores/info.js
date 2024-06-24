import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const testData = [
	{
		type: 'video',
		id: 1907599,
	},
	{
		type: 'live',
		id: 2961,
	},
	{
		type: 'audio',
		id: 2675870,
	},
]

export const useInfoStore = defineStore('infoStore', () => {
	const test = 'video'
	const media = testData.find(item => item.type === test)

	const type = ref(media.type)
	const id = ref(media.id)

	const volume = ref(0)
	const autoplay = ref(false)

	const info = computed(() => {
		return {
			id: id.value,
			type: type.value,
			volume: volume.value,
			autoplay: autoplay.value,
		}
	})

	return {
		info,
	}
})
