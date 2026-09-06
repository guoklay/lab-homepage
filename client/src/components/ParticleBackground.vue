<script setup>
// 科技感粒子 + 连线背景
const options = {
  fullScreen: { enable: false },
  background: { color: { value: 'transparent' } },
  fpsLimit: 60,
  detectRetina: true,
  interactivity: {
    events: {
      onHover: { enable: true, mode: ['grab', 'bubble'] },
      resize: { enable: true },
    },
    modes: {
      grab: { distance: 180, links: { opacity: 0.5 } },
      bubble: { distance: 200, size: 6, duration: 2, opacity: 0.8 },
    },
  },
  particles: {
    color: { value: '#38bdf8' },
    links: { color: '#22d3ee', distance: 150, enable: true, opacity: 0.16, width: 1 },
    move: { enable: true, speed: 0.8, direction: 'none', outModes: { default: 'out' } },
    number: { value: 80, density: { enable: true, area: 900 } },
    opacity: { value: 0.35 },
    shape: { type: 'circle' },
    size: { value: { min: 1, max: 3 } },
  },
};
</script>

<template>
  <div class="particle-bg">
    <vue-particles id="tsparticles" :options="options" />
  </div>
</template>

<style scoped>
.particle-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
.particle-bg :deep(#tsparticles),
.particle-bg :deep(canvas) {
  width: 100%;
  height: 100%;
}
</style>
