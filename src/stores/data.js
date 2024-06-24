import logger from '@/utils/logger'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getPictureUrlById } from '@/utils/helpers'

const UPDATE_INTERVAL = 30000

const TYPE_MAPPER = {
	video: 'datavideo',
	live: 'datalive',
	audio: 'dataaudio',
}

const getBrandInfo = (id, title) => {
	let url = `https://smotrim.ru/brand/${id}`

	return id
		? {
				title,
				url,
		  }
		: {
				title: 'Смотрим',
				url: 'https://smotrim.ru',
		  }
}

const getSeasonInfo = season => {
	return season
		? {
				title: '',
				url: '',
		  }
		: null
}

export const useDataStore = defineStore('dataStore', () => {
	let updateInterval = null

	const data = ref(null)
	const media = computed(() => data.value?.playlist?.medialist?.[0])

	const about = computed(() => {
		let tvp = media.value?.tvp

		let title = media.value?.episodeTitle ?? tvp?.title
		let url = `https://smotrim.ru/video/${media.value?.id}`

		let image =
			getPictureUrlById(data.value?.brandPicID) ??
			media.value?.pictures['16:9'] ??
			data?.template?.logo2_url ??
			tvp?.picture
		let brand = getBrandInfo(media.value?.brand_id, media.value?.brandTitle)
		let season = getSeasonInfo(media.value?.season)

		return data.value
			? {
					image,
					title,
					url,
					brand,
					season,
			  }
			: null
	})

	const source = computed(
		() => media.value?.sources?.m3u8?.auto || media.value?.audio_url
	)

	const preview = computed(() => media.value?.pictures?.['16:9'])

	const duration = computed(() => media.value?.duration)

	const hasPlaylist = computed(() => {
		return false
	})

	const getData = async ({ type, id }) => {
		let json = await fetch(
			`http://player-p81.imolchanov.dev.rfn.ru/iframe/${TYPE_MAPPER[type]}/id/${id}/sid/smotrim`
		)
			.then(response => response.json())
			.catch(error => {
				console.log(error.message)
			})

		await updateData(json?.data)
	}

	const updateData = async updateData => {
		if (!data.value) {
			data.value = updateData
		} else {
			let currentMedia = data.value?.playlist?.medialist?.[0]
			let updateMedia = updateData?.playlist?.medialist?.[0]

			// Update TVP
			if (updateMedia?.tvp?.title !== currentMedia?.tvp?.title) {
				logger.message('warning', 'DATA', 'TVP update', {
					slot: updateMedia?.tvp,
				})

				currentMedia.tvp = updateMedia?.tvp
			}
		}
	}

	const setUpdate = async ({ type, id }) => {
		if (type === 'live') {
			updateInterval = setInterval(() => getData({ type, id }), UPDATE_INTERVAL)
		}
	}

	return {
		about,
		source,
		preview,
		duration,
		hasPlaylist,
		getData,
		setUpdate,
	}
})
