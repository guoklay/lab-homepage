<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getNewsDetail } from '@/api';

const route = useRoute();
const router = useRouter();
const news = ref(null);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  try {
    news.value = await getNewsDetail(route.params.id);
  } catch (e) {
    news.value = null;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <section class="page-banner">
      <div class="container">
        <h1 class="page-banner-title">新闻详情</h1>
        <span class="page-banner-sub">News Detail</span>
      </div>
    </section>

    <section class="section container">
      <div v-loading="loading">
        <el-empty v-if="!news" description="内容不存在或已删除">
          <el-button type="primary" @click="router.push('/news')">返回列表</el-button>
        </el-empty>
        <article v-else class="article">
          <h1 class="article-title">{{ news.title }}</h1>
          <div class="article-meta">{{ news.date }}</div>
          <el-divider />
          <div class="article-content">{{ news.content || news.summary }}</div>
          <div class="article-back">
            <el-button @click="router.push('/news')">← 返回列表</el-button>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.article {
  max-width: 860px;
  margin: 0 auto;
}
.article-title {
  font-size: 26px;
  font-weight: 700;
  color: var(--lab-text);
  line-height: 1.4;
}
.article-meta {
  font-size: 14px;
  color: var(--lab-text-secondary);
  margin-top: 12px;
}
.article-content {
  font-size: 15px;
  line-height: 2;
  color: var(--lab-text);
  white-space: pre-line;
}
.article-back {
  margin-top: 32px;
}
</style>
