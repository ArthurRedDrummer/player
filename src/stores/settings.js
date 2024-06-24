import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const $elem = document.querySelector('#app');

export const useSettingsStore = defineStore('settings-store', () => {
  const fullscreen = ref('off');

  const isFullscreen = computed(() => fullscreen.value === 'on');

  function setFullscreenState(value) {
    fullscreen.value = value;
  }

  function toggleFullscreen() {
    if (isFullscreen.value) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
      }

      fullscreen.value = 'off'
    } else {
      if ($elem.requestFullscreen) {
        $elem.requestFullscreen();
      } else if ($elem.webkitRequestFullscreen) { /* Safari */
        $elem.webkitRequestFullscreen();
      } else if ($elem.msRequestFullscreen) { /* IE11 */
        $elem.msRequestFullscreen();
      }

      fullscreen.value = 'on'
    }
  }

  return {
    isFullscreen,
    toggleFullscreen, setFullscreenState
  }
})