import '@/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import { usePlayerStore } from '@/stores/player'

const app = createApp(App)
const pinia = createPinia();

app
    .use(pinia)
    .mount('#app')

const playerStore = usePlayerStore();

document.addEventListener('keyup', event => {
    if (event.key == " " || event.code == "Space") {
        playerStore.toggle();
    }
})