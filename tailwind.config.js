export default {
  content: [
    "./index.html",
    "./src/**/*.{js,vue}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'black-arrow': `url(@/assets/images/icons/arrow-black.svg)`,
        'popup-warning': `url(@/assets/images/icons/popup-warning.svg)`,
        'close-white': `url(@/assets/images/icons/close-white.svg)`,
        'close-black': `url(@/assets/images/icons/close-black.svg)`,
        'button-play': `url(@/assets/images/icons/play.svg)`,
        'button-pause': `url(@/assets/images/icons/pause.svg)`,
        'button-prev-black': `url(@/assets/images/icons/previous-black.svg)`,
        'button-prev-white': `url(@/assets/images/icons/previous-white.svg)`,
        'button-next-black': `url(@/assets/images/icons/next-black.svg)`,
        'button-next-white': `url(@/assets/images/icons/next-white.svg)`,
        'button-sound-on-white': `url(@/assets/images/icons/sound-on-white.svg)`,
        'button-sound-on-black': `url(@/assets/images/icons/sound-on-black.svg)`,
        'button-sound-off': `url(@/assets/images/icons/sound-off-colored.svg)`,
      },
      backgroundPosition: {
        'arrow-position': 'right 8px center'
      },
      backgroundSize: {
        'arrow-size': '6px 10.5px'
      }
    },
  },
  plugins: [],
}

