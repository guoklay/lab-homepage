<script setup>
defineProps({
  title: { type: String, default: '' },
  en: { type: String, default: '' },
});
</script>

<template>
  <div class="section-title">
    <h2 class="section-title-cn">{{ title }}</h2>
    <span v-if="en" class="section-title-en">{{ en }}</span>
  </div>
</template>

<style scoped>
.section-title {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 28px;
}
.section-title-cn {
  margin: 0;
  font-size: 26px;
  font-weight: 700;
  color: var(--lab-primary);
  position: relative;
  padding-left: 14px;
}
.section-title-cn::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 22px;
  background: var(--lab-accent);
  border-radius: 2px;
}
.section-title-en {
  font-size: 13px;
  color: var(--lab-accent);
  letter-spacing: 2px;
  text-transform: uppercase;
  font-family: var(--lab-font-mono);
}
</style>
