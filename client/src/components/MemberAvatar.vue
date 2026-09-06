<script setup>
import { computed } from 'vue';

const props = defineProps({
  name: { type: String, default: '' },
  src: { type: String, default: '' },
  size: { type: Number, default: 72 },
});

const initial = computed(() => (props.name || '?').charAt(0));
</script>

<template>
  <div
    class="avatar"
    :style="{ width: size + 'px', height: size + 'px', fontSize: Math.round(size * 0.38) + 'px' }"
  >
    <img v-if="src" :src="src" :alt="name" />
    <span v-else>{{ initial }}</span>
  </div>
</template>

<style scoped>
.avatar {
  border-radius: 50%;
  background: linear-gradient(135deg, var(--lab-primary), var(--lab-accent));
  color: #fff;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}
.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
