import { createApp } from 'vue'
import router from '@/router/index'
import { key, store } from '@/store'
import { i18n } from './i18n';
import App from './App.vue'

const app = createApp(App)
app.use(router).use(store, key).use(i18n).mount('#app')
