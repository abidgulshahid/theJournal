import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'  // Add this line if using Vuetify 3
import { createVuetify } from 'vuetify'
import { createPinia } from 'pinia'

const vuetify = createVuetify()
const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(router)
  .use(vuetify)
  .mount('#app')