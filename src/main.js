import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import './style.css'

// 图标
import * as IconPark from '@icon-park/vue-next'
import '@icon-park/vue-next/styles/index.css'

import BoxLoadingDirective from './directive/loadingDirective'
import './directive/loadingDirective/index.css'



const app = createApp(App)
const pinia = createPinia()

// 将所有图标注册组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
for (const [key, component] of Object.entries(IconPark)) {
    app.component('I' + key, component)
}


  
app.use(ElementPlus)

app.use(router)

app.use(pinia)

app.directive('box-loading', BoxLoadingDirective)

app.mount('#app')

