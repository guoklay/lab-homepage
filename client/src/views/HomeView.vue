<script setup>
import { ref, inject, onMounted } from 'vue';
import { getResearch, getNews, getPublications, getProjects } from '@/api';
import SectionTitle from '@/components/SectionTitle.vue';

const site = inject('site', {});
const research = ref([]);
const news = ref([]);
const pubs = ref([]);
const projects = ref([]);

onMounted(async () => {
  try {
    const [r, n, p, pj] = await Promise.all([
      getResearch(),
      getNews({ page: 1, pageSize: 4 }),
      getPublications({}),
      getProjects({}),
    ]);
    research.value = r || [];
    news.value = n?.list || [];
    pubs.value = (p || []).slice(0, 5);
    projects.value = (pj || []).slice(0, 3);
  } catch (e) {
    // 拦截器已记录错误
  }
});
</script>

<template>
  <div class="home">
    <!-- 主视觉 -->
    <section class="hero">
      <div class="container hero-inner">
        <h1 class="hero-title">{{ site.site_name || '实验室名称' }}</h1>
        <p class="hero-title-en">{{ site.site_name_en || 'Laboratory' }}</p>
        <p class="hero-slogan">{{ site.slogan || '' }}</p>
        <div class="hero-actions">
          <router-link to="/about" class="hero-btn hero-btn-primary">了解我们</router-link>
          <router-link to="/contact" class="hero-btn hero-btn-ghost">联系我们</router-link>
        </div>
      </div>
    </section>

    <!-- 简介 -->
    <section class="section container">
      <SectionTitle title="研究院简介" en="About Us" />
      <p class="about-snippet">{{ site.about || '（简介内容占位，请在后端 seed 数据中填写。）' }}</p>
      <router-link to="/about" class="more-link">查看详情 →</router-link>
    </section>

    <!-- 研究方向 -->
    <section class="section section-alt">
      <div class="container">
        <SectionTitle title="研究方向" en="Research Directions" />
        <el-row :gutter="20">
          <el-col v-for="r in research" :key="r.id" :xs="24" :sm="12" :md="6">
            <el-card shadow="hover" class="dir-card">
              <div class="dir-name">{{ r.name }}</div>
              <div class="dir-en">{{ r.name_en }}</div>
              <div class="dir-desc">{{ r.description }}</div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </section>

    <!-- 新闻动态 -->
    <section class="section container">
      <SectionTitle title="新闻动态" en="News" />
      <el-empty v-if="!news.length" description="暂无内容" />
      <ul v-else class="news-list">
        <li v-for="n in news" :key="n.id">
          <router-link :to="`/news/${n.id}`" class="news-item">
            <span class="news-title">{{ n.title }}</span>
            <span class="news-date">{{ n.date }}</span>
          </router-link>
        </li>
      </ul>
    </section>

    <!-- 代表成果 -->
    <section class="section section-alt">
      <div class="container">
        <SectionTitle title="代表成果" en="Publications" />
        <el-empty v-if="!pubs.length" description="暂无内容" />
        <ul v-else class="pub-list">
          <li v-for="p in pubs" :key="p.id">
            <div class="pub-title">{{ p.title }}</div>
            <div class="pub-meta">{{ p.authors }} · {{ p.venue }} · {{ p.year }}</div>
          </li>
        </ul>
      </div>
    </section>

    <!-- 科研项目 -->
    <section class="section container">
      <SectionTitle title="科研项目" en="Projects" />
      <el-empty v-if="!projects.length" description="暂无内容" />
      <el-row v-else :gutter="20">
        <el-col v-for="p in projects" :key="p.id" :xs="24" :sm="12" :md="8">
          <router-link :to="`/project/${p.id}`" class="proj-card">
            <div class="proj-cat">{{ p.category || '项目' }}</div>
            <div class="proj-name">{{ p.name }}</div>
            <div class="proj-meta">{{ p.funding }} · {{ p.start_year }}-{{ p.end_year }}</div>
          </router-link>
        </el-col>
      </el-row>
      <router-link to="/projects" class="more-link">查看全部项目 →</router-link>
    </section>
  </div>
</template>

<style scoped>
.hero {
  background: radial-gradient(circle at 20% 15%, rgba(59, 130, 246, 0.18), transparent 45%),
    radial-gradient(circle at 80% 0%, rgba(34, 211, 238, 0.14), transparent 40%),
    linear-gradient(160deg, #0b1322 0%, #0a1020 100%);
  color: #fff;
  padding: 110px 0;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid var(--lab-border);
}
.hero::after {
  content: '';
  position: absolute;
  right: -80px;
  top: -80px;
  width: 380px;
  height: 380px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(34, 211, 238, 0.14), transparent 70%);
}
.hero-inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.hero-title {
  font-size: 44px;
  font-weight: 700;
  letter-spacing: 2px;
  text-shadow: 0 0 30px var(--lab-glow);
}
.hero-title-en {
  font-size: 18px;
  color: var(--lab-accent);
  letter-spacing: 2px;
  font-family: var(--lab-font-mono);
}
.hero-slogan {
  font-size: 16px;
  color: var(--lab-accent);
  letter-spacing: 2px;
}
.hero-actions {
  margin-top: 16px;
  display: flex;
  gap: 16px;
}
.hero-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 0 30px;
  border-radius: 6px;
  font-size: 15px;
  text-decoration: none;
  transition: all 0.2s;
}
.hero-btn-primary {
  background: linear-gradient(135deg, var(--lab-primary), var(--lab-accent));
  color: #04121f;
  box-shadow: 0 0 20px var(--lab-glow);
}
.hero-btn-primary:hover {
  filter: brightness(1.12);
}
.hero-btn-ghost {
  border: 1px solid rgba(56, 189, 248, 0.5);
  color: #c8f4ff;
}
.hero-btn-ghost:hover {
  background: rgba(56, 189, 248, 0.12);
}

.about-snippet {
  color: var(--lab-text-secondary);
  font-size: 15px;
  white-space: pre-line;
  max-width: 860px;
}
.more-link {
  display: inline-block;
  margin-top: 12px;
  color: var(--el-color-primary);
  text-decoration: none;
  font-size: 14px;
}
.more-link:hover {
  text-decoration: underline;
}

.dir-card {
  height: 100%;
  border-top: 3px solid var(--lab-primary);
}
.dir-card :deep(.el-card__body) {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.dir-name {
  font-size: 17px;
  font-weight: 600;
  color: var(--lab-primary);
}
.dir-en {
  font-size: 12px;
  color: var(--lab-text-secondary);
  letter-spacing: 0.5px;
}
.dir-desc {
  font-size: 14px;
  color: var(--lab-text-secondary);
  line-height: 1.7;
}

.news-list,
.pub-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.news-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px dashed var(--lab-border);
  text-decoration: none;
}
.news-title {
  color: var(--lab-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.news-item:hover .news-title {
  color: var(--el-color-primary);
}
.news-date {
  color: var(--lab-text-secondary);
  font-size: 13px;
  flex-shrink: 0;
}
.pub-list li {
  padding: 12px 0;
  border-bottom: 1px dashed var(--lab-border);
}
.pub-title {
  font-size: 15px;
  font-weight: 500;
  color: var(--lab-text);
}
.pub-meta {
  font-size: 13px;
  color: var(--lab-text-secondary);
  margin-top: 4px;
}

.proj-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px 18px;
  background: var(--lab-surface);
  border: 1px solid var(--lab-border);
  border-radius: var(--lab-radius);
  border-left: 3px solid var(--lab-accent);
  text-decoration: none;
  transition: all 0.2s;
  height: 100%;
}
.proj-card:hover {
  box-shadow: 0 8px 26px rgba(59, 130, 246, 0.25);
  transform: translateY(-3px);
  border-color: rgba(56, 189, 248, 0.4);
}
.proj-cat {
  font-size: 12px;
  color: var(--lab-accent);
}
.proj-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--lab-text);
  line-height: 1.5;
}
.proj-meta {
  font-size: 13px;
  color: var(--lab-text-secondary);
}
</style>
