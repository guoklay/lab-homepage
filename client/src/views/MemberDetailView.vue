<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getMember, getPublications } from '@/api';
import MemberAvatar from '@/components/MemberAvatar.vue';

const route = useRoute();
const router = useRouter();
const member = ref(null);
const pubs = ref([]);
const loading = ref(false);

const typeMap = { faculty: '教师', phd: '博士生', master: '硕士生', alumni: '校友', visiting: '访问学者' };

onMounted(async () => {
  loading.value = true;
  try {
    member.value = await getMember(route.params.id);
    pubs.value = (await getPublications({ member_id: route.params.id })) || [];
  } catch (e) {
    member.value = null;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <section class="page-banner">
      <div class="container">
        <h1 class="page-banner-title">成员详情</h1>
        <span class="page-banner-sub">Member</span>
      </div>
    </section>

    <section class="section container">
      <div v-loading="loading">
        <el-empty v-if="!member" description="成员不存在">
          <el-button type="primary" @click="router.push('/team')">返回团队</el-button>
        </el-empty>

        <template v-else>
          <el-row :gutter="40">
            <el-col :xs="24" :md="6">
              <div class="profile">
                <MemberAvatar :name="member.name" :src="member.avatar" :size="140" />
                <div class="profile-name">{{ member.name }}</div>
                <div class="profile-name-en">{{ member.name_en }}</div>
                <div class="profile-title">{{ member.title }}</div>
                <div class="profile-type">{{ typeMap[member.type] || member.type }}</div>
              </div>
            </el-col>
            <el-col :xs="24" :md="18">
              <div class="info-block">
                <div class="info-label">研究方向</div>
                <div class="info-value">{{ member.research_direction || '—' }}</div>
              </div>
              <div class="info-block">
                <div class="info-label">邮箱</div>
                <div class="info-value">{{ member.email || '—' }}</div>
              </div>
              <div class="info-block">
                <div class="info-label">个人简介</div>
                <div class="info-value pre-line">{{ member.bio || '—' }}</div>
              </div>
            </el-col>
          </el-row>

          <div class="pubs-section">
            <h2 class="pubs-title">代表成果</h2>
            <el-empty v-if="!pubs.length" description="暂无关联成果" :image-size="80" />
            <ul v-else class="pub-list">
              <li v-for="p in pubs" :key="p.id">
                <div class="pub-title">{{ p.title }}</div>
                <div class="pub-meta">{{ p.authors }} · {{ p.venue }} · {{ p.year }}</div>
              </li>
            </ul>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<style scoped>
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 32px 16px;
  background: var(--lab-surface);
  border: 1px solid var(--lab-border);
  border-radius: var(--lab-radius);
}
.profile-name {
  font-size: 20px;
  font-weight: 700;
  color: var(--lab-text);
  margin-top: 16px;
}
.profile-name-en {
  font-size: 13px;
  color: var(--lab-text-secondary);
  margin-top: 4px;
}
.profile-title {
  font-size: 14px;
  color: var(--lab-accent);
  margin-top: 10px;
}
.profile-type {
  font-size: 13px;
  color: var(--lab-text-secondary);
  margin-top: 6px;
}
.info-block {
  padding: 14px 0;
  border-bottom: 1px dashed var(--lab-border);
}
.info-label {
  font-size: 13px;
  color: var(--lab-text-secondary);
  margin-bottom: 4px;
}
.info-value {
  font-size: 15px;
  color: var(--lab-text);
}
.pre-line {
  white-space: pre-line;
  line-height: 1.9;
}
.pubs-section {
  margin-top: 36px;
}
.pubs-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--lab-primary);
  margin-bottom: 16px;
  padding-left: 12px;
  border-left: 4px solid var(--lab-accent);
}
.pub-list {
  list-style: none;
  margin: 0;
  padding: 0;
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
</style>
