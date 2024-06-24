<template>
  <player-header />
  <player-main />
  <player-footer />
  <Transition name="loading">
    <player-loader v-if="isLoading" />
  </Transition>
  <Transition name="popup">
    <player-pop-up v-if="isPopupActive" />
  </Transition>
</template>

<script setup>
import logger from '@/utils/logger'
import PlayerHeader from '@/components/sections/PlayerHeader.vue'
import PlayerFooter from '@/components/sections/PlayerFooter.vue'
import PlayerMain from '@/components/sections/PlayerMain.vue'
import PlayerPopUp from '@/components/sections/PlayerPopUp.vue'
import PlayerLoader from '@/components/sections/PlayerLoader.vue'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useInfoStore } from '@/stores/info'
import { useDataStore } from '@/stores/data'
import { usePlayerStore } from '@/stores/player'
import { usePopupStore } from '@/stores/popup'
import { useLoaderStore } from '@/stores/loader'

// Store defenition
const infoStore = useInfoStore();
const dataStore = useDataStore();
const playerStore = usePlayerStore();
const popupStore = usePopupStore();
const loaderStore = useLoaderStore();

// Getters from stores
const { info } = storeToRefs(infoStore);
const { autoplay } = storeToRefs(playerStore);
const { isPopupActive } = storeToRefs(popupStore);
const { isLoading } = storeToRefs(loaderStore)

// Actions from stores
const { getData, setUpdate } = dataStore;
const { play } = playerStore;

onMounted(async () => {
  logger.message('message', 'APP', 'Initialazing player');

  await getData({
    id: info.value.id,
    type: info.value.type
  });

  logger.message('message', 'APP', 'Got data');

  await setUpdate({
    id: info.value.id,
    type: info.value.type
  });


  if (info.value.autoplay) {
    await play();
  }
})
</script>