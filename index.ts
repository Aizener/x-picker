import { App } from 'vue'
import Picker from './Picker.vue'

const pickerPlugin = {
  install: (app: App) => {
    app.component('x-picker', Picker)
  }
}

export default pickerPlugin