import '@/index.css'
import App from './App.vue'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { usePlayerStore } from '@/stores/player'
import { useSettingsStore } from '@/stores/settings'

const app = createApp(App)
const pinia = createPinia();

app
    .use(pinia)
    .mount('#app')

const playerStore = usePlayerStore();
const settingsStore = useSettingsStore();

document.addEventListener('keyup', event => {
    if (event.key == " " || event.code == "Space") {
        playerStore.toggle();
    }
});

document.addEventListener('fullscreenchange', event => {
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        settingsStore.setFullscreenState('off');
    }
});