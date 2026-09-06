<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPublication, getMember } from '@/api';

const route = useRoute();
const router = useRouter();
const pub = ref(null);
const member = ref(null);
const loading = ref(false);

const typeMap = { journal: '期刊论文', conference: '会议论文', patent: '专利' };

onMounted(async () => {
  loading.value = true;
  try {
    pub.value = await getPublication(route.params.id);
    if (pub.value?.member_id) {
      try {
        member.value = await getMember(pub.value.member_id);
      } catch (e) {
        member.value = null;
      }
    }
  } catch (e) {
    pub.value = null;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <section class="page-banner">
      <div class="container">
        <h1 class="page-banner-title">成果详情</h1>
        <span class="page-banner-sub">Publication</span>
      </div>
    </section>

    <section class="section container">
      <div v-loading="loading">
        <el-empty v-if="!pub" description="成果不存在">
          <el-button type="primary" @click="router.push('/publications')">返回列表</el-button>
        </el-empty>

        <article v-else class="article">
          <el-tag class="type-tag">{{ typeMap[pub.type] || pub.type }}</el-tag>
          <h1 class="article-title">{{ pub.title }}</h1>

          <div class="meta">
            <div class="meta-row">
              <span class="meta-label">作者</span>
              <span>{{ pub.authors || '—' }}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">发表</span>
              <span>{{ pub.venue || '—' }} · {{ pub.year }}</span>
            </div>
            <div v-if="pub.pages" class="meta-row">
              <span class="meta-label">卷期页码</span>
              <span>{{ pub.pages }}</span>
            </div>
            <div v-if="pub.keywords" class="meta-row">
              <span class="meta-label">关键词</span>
              <span>{{ pub.keywords }}</span>
            </div>
            <div v-if="pub.doi" class="meta-row">
              <span class="meta-label">DOI</span>
              <a :href="`https://doi.org/${pub.doi}`" target="_blank" rel="noopener" class="link">{{ pub.doi }}</a>
            </div>
            <div v-if="member" class="meta-row">
              <span class="meta-label">关联成员</span>
              <router-link :to="`/member/${member.id}`" class="link">{{ member.name }}</router-link>
            </div>
          </div>

          <div v-if="pub.abstract" class="abstract">
            <div class="abstract-title">摘要</div>
            <p class="abstract-text">{{ pub.abstract }}</p>
          </div>

          <div v-if="pub.link" class="actions">
            <a :href="pub.link" target="_blank" rel="noopener" class="btn-link">查看原文 →</a>
          </div>

          <div class="back">
            <el-button @click="router.push('/publications')">← 返回列表</el-button>
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
.type-tag {
  margin-bottom: 16px;
}
.article-title {
  font-size: 26px;
  font-weight: 700;
  color: var(--lab-text);
  line-height: 1.4;
}
.meta {
  margin-top: 20px;
  padding: 16px 0;
  border-top: 1px solid var(--lab-border);
  border-bottom: 1px solid var(--lab-border);
}
.meta-row {
  display: flex;
  gap: 12px;
  padding: 6px 0;
  font-size: 14px;
  color: var(--lab-text);
}
.meta-label {
  flex-shrink: 0;
  width: 80px;
  color: var(--lab-text-secondary);
}
.link {
  color: var(--lab-accent);
  text-decoration: none;
}
.link:hover {
  text-decoration: underline;
}
.abstract {
  margin-top: 24px;
}
.abstract-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--lab-text);
  margin-bottom: 10px;
}
.abstract-text {
  font-size: 15px;
  line-height: 2;
  color: var(--lab-text-secondary);
  white-space: pre-line;
}
.actions {
  margin-top: 24px;
}
.btn-link {
  color: var(--lab-accent);
  text-decoration: none;
  font-size: 15px;
}
.btn-link:hover {
  text-decoration: underline;
}
.back {
  margin-top: 32px;
}
</style>
