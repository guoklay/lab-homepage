import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import Particles from '@tsparticles/vue3';
import { loadSlim } from '@tsparticles/slim';

import App from './App.vue';
import router from './router';
import './assets/styles/main.css';

const app = createApp(App);

// 全局注册 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(ElementPlus);
app.use(router);
// 粒子背景引擎
app.use(Particles, {
  init: async (engine) => {
    await loadSlim(engine);
  },
});

app.mount('#app');
