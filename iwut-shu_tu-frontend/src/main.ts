

import { createApp } from 'vue'
import TDesign from 'tdesign-mobile-vue';
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'tdesign-mobile-vue/es/style/index.css';
import '@/assets/global.less'
import '@/assets/theme.css'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(TDesign);
app.mount('#app')
