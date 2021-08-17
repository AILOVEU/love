import { createApp } from 'vue'
import Vant from 'vant';
import 'lib-flexible/flexible'
import App from './App.vue'
// import router from './router'
import 'vant/lib/index.css'; // 全局引入样式
// import './index.css'

const app = createApp(App) // 创建实例

app.use(Vant) // 注册组件
// app.use(router)

app.mount('#app')