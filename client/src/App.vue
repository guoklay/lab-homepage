<script setup>
import { ref, provide, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getSite } from '@/api';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import ParticleBackground from '@/components/ParticleBackground.vue';

// 站点信息全局注入，供头部/页脚/各页面使用
const site = ref({});
provide('site', site);

const route = useRoute();

onMounted(async () => {
  try {
    site.value = (await getSite()) || {};
  } catch (e) {
    site.value = {};
  }
});
</script>

<template>
  <ParticleBackground />
  <div class="app">
    <AppHeader />
    <main class="app-main">
      <router-view v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </Transition>
      </router-view>
    </main>
    <AppFooter />
  </div>
</template>

<style>
.app {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.app-main {
  flex: 1;
}
</style>
