import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.js'

// 引入组件库全局样式资源
import 'tdesign-vue-next/es/style/index.css'

import TDesign from 'tdesign-vue-next'

const app = createApp(App)
app.use(router).use(TDesign)
app.mount('#app')
