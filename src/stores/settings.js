import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useInfoStore } from './info'
import { usePlayerStore } from './player'

const $elem = document.querySelector('#app');

function bitrateToQuality(bitrate) {

  if (bitrate <= 400000) {
    return '320p';
  }

  if (bitrate > 400000 && bitrate <= 800000) {
    return '480p';
  }

  if (bitrate > 800000 && bitrate <= 1200000) {
    return '528p';
  }

  if (bitrate > 1200000 && bitrate <= 1800000) {
    return '720p';
  }

  if (bitrate > 1800000) {
    return '1080p';
  }

  return null;
}

export const useSettingsStore = defineStore('settings-store', () => {
  const infoStore = useInfoStore();
  const playerStore = usePlayerStore();

  const fullscreen = ref('off');
  const qualityList = ref(null);
  const currentLevel = ref(-1);
  const speedList = ref([0.5, 0.75, 1, 1.5, 2]);
  const currentSpeed = ref(1);

  const isQualityListVisible = ref(false);
  const isSpeedListVisible = ref(false);

  const isFullscreen = computed(() => fullscreen.value === 'on');
  const isSpeedChangeAvailable = computed(() => infoStore.info?.type !== 'live');

  const speed = computed(() => speedList.value?.map((item, index) => {
    return {
      key: `speed-list-item-${index}`,
      title: item,
      isActive: item === currentSpeed.value
    }
  }));

  const levels = computed(() => qualityList.value?.map((item, index) => {
    return {
      key: `quality-list-item-${index}`,
      title: item.title,
      value: item.value,
      isActive: item.value === currentLevel.value,
      isHD: item.title === '1080p' || item.title === '720p'
    }
  }));

  function setQualityList(value) {
    const auto = {
      title: 'Auto',
      value: -1
    }
    const levels = value.map((level, index) => {
      return {
        title: bitrateToQuality(level.bitrate),
        value: index
      }
    }).filter(level => level.title).reverse();

    qualityList.value = [auto, ...levels];
  }

  function showQualityList() {
    isQualityListVisible.value = true;
    hideSpeedList();
  }

  function hideQualityList() {
    isQualityListVisible.value = false;
  }

  function changeQuality(value) {
    playerStore.setLevel(value);
    currentLevel.value = value;
    hideQualityList();
  }

  function showSpeedList() {
    isSpeedListVisible.value = true;
    hideQualityList();
  }

  function hideSpeedList() {
    isSpeedListVisible.value = false;
  }

  function changeSpeed(value) {
    playerStore.setSpeed(value);
    currentSpeed.value = value;
    hideSpeedList();
  }

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
    speed, currentSpeed, isSpeedListVisible, isSpeedChangeAvailable, showSpeedList, hideSpeedList, changeSpeed,
    levels, isQualityListVisible, setQualityList, showQualityList, hideQualityList, changeQuality,
    isFullscreen, toggleFullscreen, setFullscreenState
  }
})