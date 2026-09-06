<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getProject } from '@/api';
import MemberAvatar from '@/components/MemberAvatar.vue';

const route = useRoute();
const router = useRouter();
const project = ref(null);
const loading = ref(false);

const statusMap = { ongoing: '进行中', completed: '已结题' };

onMounted(async () => {
  loading.value = true;
  try {
    project.value = await getProject(route.params.id);
  } catch (e) {
    project.value = null;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <section class="page-banner">
      <div class="container">
        <h1 class="page-banner-title">项目详情</h1>
        <span class="page-banner-sub">Project</span>
      </div>
    </section>

    <section class="section container">
      <div v-loading="loading">
        <el-empty v-if="!project" description="项目不存在">
          <el-button type="primary" @click="router.push('/projects')">返回列表</el-button>
        </el-empty>

        <article v-else class="article">
          <div class="tags">
            <el-tag>{{ project.category || '项目' }}</el-tag>
            <el-tag :type="project.status === 'ongoing' ? 'success' : 'info'">
              {{ statusMap[project.status] || project.status }}
            </el-tag>
          </div>
          <h1 class="article-title">{{ project.name }}</h1>

          <div class="meta">
            <div class="meta-row">
              <span class="meta-label">起止时间</span>
              <span>{{ project.start_year }} — {{ project.end_year }}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">项目类别</span>
              <span>{{ project.category || '—' }}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">经费</span>
              <span>{{ project.funding || '—' }}</span>
            </div>
          </div>

          <div class="desc">
            <div class="desc-title">项目简介</div>
            <p class="desc-text">{{ project.description || '—' }}</p>
          </div>

          <div v-if="project.members && project.members.length" class="members">
            <div class="desc-title">参与成员</div>
            <div class="member-list">
              <router-link v-for="m in project.members" :key="m.id" :to="`/member/${m.id}`" class="member-item">
                <MemberAvatar :name="m.name" :src="m.avatar" :size="48" />
                <div class="member-info">
                  <div class="member-name">{{ m.name }}</div>
                  <div class="member-title">{{ m.title }}</div>
                </div>
              </router-link>
            </div>
          </div>

          <div class="back">
            <el-button @click="router.push('/projects')">← 返回列表</el-button>
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
.tags {
  display: flex;
  gap: 10px;
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
.desc {
  margin-top: 24px;
}
.desc-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--lab-text);
  margin-bottom: 10px;
}
.desc-text {
  font-size: 15px;
  line-height: 2;
  color: var(--lab-text-secondary);
  white-space: pre-line;
}
.members {
  margin-top: 24px;
}
.member-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 14px;
}
.member-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  background: var(--lab-surface);
  border: 1px solid var(--lab-border);
  border-radius: var(--lab-radius);
  text-decoration: none;
  transition: all 0.2s;
}
.member-item:hover {
  border-color: rgba(56, 189, 248, 0.5);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.2);
  transform: translateY(-2px);
}
.member-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--lab-text);
}
.member-title {
  font-size: 13px;
  color: var(--lab-text-secondary);
  margin-top: 2px;
}
.back {
  margin-top: 32px;
}
</style>
