import {
  combinePresetAndAppleSplashScreens,
  defineConfig,
  minimal2023Preset
} from '@vite-pwa/assets-generator/config'

export default defineConfig({
  headLinkOptions: {
    preset: '2023'
  },
  preset: combinePresetAndAppleSplashScreens(
    minimal2023Preset, {
      // a white background is a good default for the splash screen
      resizeOptions: { background: 'white' },
      linkMediaOptions: {
        // log the links to the console
        log: true,
        // add screen to media attribute
        addMediaScreen: true,
        basePath: '/',
        xhtml: false
      },
      // by default, it will generate for all devices
    }
  ),
  images: ['public/icon-512x512.svg']
})
