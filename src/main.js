/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

import components from '@/components/UI'

const app = createApp(App)
//регистрация UI компонентов
components.forEach(component => {
  app.component(component.name, component)
})

registerPlugins(app)

app.mount('#app')
