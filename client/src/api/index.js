import axios from 'axios';
import { getToken, clearToken } from '@/admin/auth';

const http = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// 自动附带 Token
http.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 统一解包 data，401 时清 token 并跳转登录
http.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const status = err?.response?.status;
    const msg = err?.response?.data?.error || err.message || '网络请求失败';
    if (status === 401 && !location.pathname.startsWith('/admin/login')) {
      clearToken();
      location.href = '/admin/login';
    }
    console.error('[API]', msg);
    return Promise.reject(err);
  }
);

// ===== 认证 =====
export const login = (username, password) => http.post('/auth/login', { username, password });
export const getMe = () => http.get('/auth/me');

// ===== 站点信息 =====
export const getSite = () => http.get('/site');
export const updateSite = (data) => http.put('/site', data);

// ===== 成员 =====
export const getMembers = (params) => http.get('/members', { params });
export const getMember = (id) => http.get(`/members/${id}`);
export const createMember = (data) => http.post('/members', data);
export const updateMember = (id, data) => http.put(`/members/${id}`, data);
export const deleteMember = (id) => http.delete(`/members/${id}`);

// ===== 研究方向 =====
export const getResearch = () => http.get('/research');
export const createResearch = (data) => http.post('/research', data);
export const updateResearch = (id, data) => http.put(`/research/${id}`, data);
export const deleteResearch = (id) => http.delete(`/research/${id}`);

// ===== 成果 =====
export const getPublications = (params) => http.get('/publications', { params });
export const getPublication = (id) => http.get(`/publications/${id}`);
export const createPublication = (data) => http.post('/publications', data);
export const updatePublication = (id, data) => http.put(`/publications/${id}`, data);
export const deletePublication = (id) => http.delete(`/publications/${id}`);

// ===== 新闻 =====
export const getNews = (params) => http.get('/news', { params });
export const getNewsDetail = (id) => http.get(`/news/${id}`);
export const createNews = (data) => http.post('/news', data);
export const updateNews = (id, data) => http.put(`/news/${id}`, data);
export const deleteNews = (id) => http.delete(`/news/${id}`);

// ===== 项目 =====
export const getProjects = (params) => http.get('/projects', { params });
export const getProject = (id) => http.get(`/projects/${id}`);
export const createProject = (data) => http.post('/projects', data);
export const updateProject = (id, data) => http.put(`/projects/${id}`, data);
export const deleteProject = (id) => http.delete(`/projects/${id}`);

// ===== 上传 =====
export const uploadImage = (file) => {
  const fd = new FormData();
  fd.append('file', file);
  return http.post('/upload', fd);
};

export default http;
