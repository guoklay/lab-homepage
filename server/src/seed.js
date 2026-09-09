/**
 * 种子数据（内容基于课题组负责人康海东个人主页填充）
 * 未提供的字段（学生、电话、备案号等）保持空白，后续可在此补充或通过后台管理维护。
 */
const db = require('./db');

const SITE = [
  ['site_name', '康海东课题组'],
  ['site_name_en', 'Haidong Kang Research Group'],
  ['university', '东北大学秦皇岛分校 · 计算机与通信工程学院'],
  ['slogan', '边缘计算 · 机器学习 · 可信人工智能'],
  ['about', '康海东课题组依托东北大学秦皇岛分校计算机与通信工程学院，围绕边缘计算、机器学习、自动化算法设计、协作学习与可信人工智能等方向开展研究。\n\n课题组负责人康海东，工学博士，东北大学副教授、硕士研究生导师，2025 年 10 月博士毕业于东北大学，同年加入东北大学计算机学院。在 IEEE Transactions on Computers、IEEE Transactions on Mobile Computing、SCIS、ICML、ICCV、NeurIPS、ACM MM、IJCAI、AAAI、IEEE TNNLS 等顶级期刊/会议发表论文多篇，其中一篇 CCF A 类期刊论文入选 ESI 高被引。\n\n课题组常年招收硕士研究生、本科生及校外实习生，欢迎对人工智能研究感兴趣、有自驱力的同学加入。'],
  ['address', '河北省秦皇岛市经济技术开发区泰山路143号'],
  ['email', 'kanghaidong@qhd.neu.edu.cn'],
  ['phone', ''],
  ['icp', ''],
];

const MEMBERS = [
  {
    name: '康海东',
    name_en: 'Haidong Kang',
    title: '副教授 · 硕士生导师',
    type: 'faculty',
    research_direction: '边缘计算、机器学习、协作学习、可信人工智能',
    email: 'kanghaidong@qhd.neu.edu.cn',
    bio: '工学博士，东北大学副教授、硕士研究生导师。\n\n2025 年 10 月博士毕业于东北大学，同年加入东北大学计算机学院。研究方向包括边缘计算、机器学习、协作学习和可信人工智能，在 IEEE Transactions on Computers、IEEE Transactions on Mobile Computing、SCIS、ICML、ICCV、NeurIPS、ACM MM、IJCAI、AAAI、IEEE TNNLS 等 CCF A 类顶级期刊/会议发表论文多篇。\n\n2024 年 10 月获研究生国家奖学金。',
  },
];

const RESEARCH = [
  { name: '边缘计算', name_en: 'Edge Computing', description: '轻量级神经网络与大模型、实时视频分析系统、工业视觉、AI 边缘服务与系统设计。' },
  { name: '机器学习', name_en: 'Machine Learning', description: '稳定性与泛化误差界、小样本学习、自监督学习、AI for Science 与 AIGC。' },
  { name: '自动化算法设计', name_en: 'Automated Algorithm Design', description: '神经网络架构设计、对抗攻击设计、免训练指标设计、混合精度量化、MoE 分解、黑盒优化、优化器设计等。' },
  { name: '协作学习', name_en: 'Collaborative Learning', description: '大模型推理、分布式机器学习、联邦学习、多任务与持续学习、模型融合。' },
  { name: '可信人工智能', name_en: 'Trustworthy Artificial Intelligence', description: '对抗攻击与防御、鲁棒训练、大模型攻击、AIGC 检测、树突神经网络研究与应用。' },
];

// 已正式录用/发表的论文（"under review" 未收录）。member_id 统一关联康海东（成员 id 1）
const PUBLICATIONS = [
  // —— 会议论文 ——
  { title: 'Unlocking the Potential of Continual Model Merging: An ODE Perspective', authors: 'Lihong Lin, Haidong Kang', venue: 'ICML 2026', year: 2026, type: 'conference', link: 'https://github.com/yohbii/ODE-M' },
  { title: 'Automatic Pruning Discovery for Large Language Models', authors: 'Haidong Kang, Lihong Lin, Enneng Yang, Hong-Ning Dai, Hao Wang', venue: 'ICML 2026', year: 2026, type: 'conference' },
  { title: 'BARC: Coupling Budget-Adaptive Computation with Anytime-Valid e-Processes for Reliable Streaming Decisions', authors: 'Changyu Li, Ming Lei, Haidong Kang, Lijuan Shen, Xinyu Wang, Fei Luo', venue: 'ICML 2026', year: 2026, type: 'conference' },
  { title: 'RA-MoE: Efficient Edge Federated Learning for Emotion Recognition Based on Resource-Aware Scheduling and Mixture-of-Experts Model', authors: 'Aiwen Wang, Xiaoming Yuan, Haidong Kang, Changle Li, Ning Zhang, Celimuge Wu, Jalel Ben Othman', venue: 'INFOCOM 2026', year: 2026, type: 'conference' },
  { title: 'Rethinking Open Set Domain Generalization: Learning to Generalize via Conditional Diffusion Without Gradient', authors: 'Haidong Kang, Shuo Yin, Huiquan Zhang, Qihui Zhao, Yifan Shen, Taolin Zhang, Enneng Yang', venue: 'CVPR 2026', year: 2026, type: 'conference' },
  { title: 'QueueEDIT: Structural Self-Correction for Sequential Model Editing in LLMs', authors: 'Taolin Zhang, Haidong Kang, Dongyang Li, Qizhou Chen, Chengyu Wang, Xiaofeng He, Richang Hong', venue: 'ACL 2026', year: 2026, type: 'conference', link: 'https://arxiv.org/pdf/2506.17864' },
  { title: 'Understanding and Enhancing Differentiable Architecture Search From Information Bottleneck Perspective', authors: 'Haidong Kang, Lianbo Ma, Pengjun Chen, Qiang He, Bo Yi', venue: 'AAAI 2026', year: 2026, type: 'conference' },
  { title: 'Revolutionizing Training-Free NAS: Towards Efficient Automatic Proxy Discovery via Large Language Models', authors: 'Haidong Kang, Lihong Lin, Hanling Wang', venue: 'NeurIPS 2025', year: 2025, type: 'conference', link: 'https://openreview.net/forum?id=3naHyE5klE' },
  { title: 'HoloTrace: LLM-based Bidirectional Causal Knowledge Graph for Edge-Cloud Video Anomaly Detection', authors: 'Hanling Wang, Qing Li, Li Chen, Haidong Kang, Fei Ma, Yong Jiang', venue: 'ACM MM 2025', year: 2025, type: 'conference' },
  { title: 'Beyond the Limits: Overcoming Negative Correlations of Activation-Based Training-Free NAS', authors: 'Haidong Kang, Lianbo Ma, Pengjun Chen, Guo Yu, Qing Li', venue: 'ICCV 2025', year: 2025, type: 'conference', link: 'https://iccv.thecvf.com/virtual/2025/poster/966' },
  { title: 'Revisiting Neural Networks for Few-Shot Learning: A Zero-Cost NAS Perspective', authors: 'Haidong Kang', venue: 'ICML 2025', year: 2025, type: 'conference', link: 'https://openreview.net/forum?id=fNixzmprun' },
  { title: 'Where and How to Enhance: Discovering Bit-Width Contribution for Mixed Precision Quantization', authors: 'Haidong Kang, Lianbo Ma, Guo Yu, Shangce Gao', venue: 'IJCAI 2025', year: 2025, type: 'conference' },
  { title: 'MRT-NAS: Boosting Training-Free NAS via Manifold Regularization', authors: 'Pengjun Chen, Jian Gao, Haidong Kang, et al.', venue: 'ICANN 2025', year: 2025, type: 'conference' },
  { title: 'When NAS Meets Anomaly Detection: In Search of Resource-Efficient Architectures in Surveillance Video', authors: 'Haidong Kang, et al.', venue: 'IJCNN 2024', year: 2024, type: 'conference' },
  { title: 'Neural Architecture Search Based on Brain Storm Optimization Algorithm for Face Detection', authors: 'Tian Zhang, Nan Li, Haidong Kang, et al.', venue: 'IJCNN 2024', year: 2024, type: 'conference' },

  // —— 期刊论文 ——
  { title: 'Understanding and Enhancing Mixed Precision Quantization Search on Target Hardware for Neural Network Accelerators', authors: 'Haidong Kang, Lianbo Ma, Guo Yu, Guoyang Xie, Qing Li, Shangce Gao, Zhichao Lu', venue: 'Science China Information Sciences (SCIS)', year: 2026, type: 'journal' },
  { title: 'Survey on Large Language Model Inference Acceleration: Principles, Algorithms, Applications and Open Issues', authors: 'Jian Cheng, Haidong Kang, Yuxin Shao, Pengjun Chen, Nan Li, Rui Wang, Saiqin Long, Xiaochun Yang, Lianbo Ma', venue: 'IEEE Transactions on Neural Networks and Learning Systems (TNNLS)', year: 2025, type: 'journal', link: 'https://ieeexplore.ieee.org/abstract/document/11247933/' },
  { title: 'Evolving Neural Network for Few-Shot Learning via Zero-Cost NAS', authors: 'Haidong Kang, et al.', venue: 'Swarm and Evolutionary Computation (SWEVO)', year: 2025, type: 'journal' },
  { title: 'Single-Domain Generalized Predictor for Neural Architecture Search System', authors: 'Lianbo Ma, Haidong Kang, Guo Yu, Qing Li, Qiang He', venue: 'IEEE Transactions on Computers', year: 2024, type: 'journal' },
  { title: 'ParaLoupe: Real-time Video Analytics on Edge Cluster via Mini Model Parallelization', authors: 'Hanling Wang, Qing Li, Haidong Kang, et al.', venue: 'IEEE Transactions on Mobile Computing', year: 2024, type: 'journal' },
];

const NEWS = [
  { title: '课题组两篇关于大模型与模型融合的论文被 ICML 2026 录用', date: '2026-05-01', summary: '两篇关于大模型与模型融合的论文被 ICML 2026 录用。', content: '课题组两篇关于大模型与模型融合的论文被国际机器学习大会 ICML 2026 录用。', category: 'achievement' },
  { title: '一篇关于大模型的论文被 ACL 2026 Findings 录用', date: '2026-04-01', summary: '一篇关于大模型的论文被 ACL 2026 Findings 录用。', content: '一篇关于大模型的论文被 ACL 2026 Findings 录用。', category: 'achievement' },
  { title: '一篇关于大模型的论文被 INFOCOM 2026 录用', date: '2026-02-15', summary: '一篇关于大模型的论文被 INFOCOM 2026 录用。', content: '一篇关于大模型的论文被 INFOCOM 2026 录用。', category: 'achievement' },
  { title: '一篇关于开放集域泛化的论文被 CVPR 2026 录用', date: '2026-02-10', summary: '一篇关于开放集域泛化的论文被 CVPR 2026 录用。', content: '一篇关于开放集域泛化的论文被 CVPR 2026 录用。', category: 'achievement' },
  { title: '一篇关于混合精度量化的论文被 SCIS 录用', date: '2025-12-01', summary: '一篇关于混合精度量化的论文被 Science China Information Sciences 录用。', content: '一篇关于混合精度量化的论文被 Science China Information Sciences 录用。', category: 'achievement' },
  { title: '一篇关于 NAS 的论文被 AAAI 2026 录用', date: '2025-11-20', summary: '一篇关于神经网络架构搜索的论文被 AAAI 2026 录用。', content: '一篇关于神经网络架构搜索的论文被 AAAI 2026 录用。', category: 'achievement' },
  { title: '大模型推理加速综述论文被 IEEE TNNLS 录用', date: '2025-11-10', summary: '大模型推理加速综述论文被 IEEE TNNLS 录用。', content: '大模型推理加速综述论文被 IEEE TNNLS 录用。', category: 'achievement' },
  { title: '一篇关于小样本学习 NAS 的论文被 SWEVO 录用', date: '2025-10-01', summary: '一篇关于小样本学习 NAS 的论文被 Swarm and Evolutionary Computation 录用。', content: '一篇关于小样本学习 NAS 的论文被 Swarm and Evolutionary Computation 录用。', category: 'achievement' },
  { title: '一篇关于大模型的论文被 NeurIPS 2025 录用', date: '2025-09-01', summary: '一篇关于大模型的论文被 NeurIPS 2025 录用。', content: '一篇关于大模型的论文被 NeurIPS 2025 录用。', category: 'achievement' },
  { title: '一篇关于大模型的论文被 ACM MM 2025 录用', date: '2025-07-01', summary: '一篇关于大模型的论文被 ACM MM 2025 录用。', content: '一篇关于大模型的论文被 ACM MM 2025 录用。', category: 'achievement' },
  { title: '一篇关于免训练 NAS 的论文被 ICCV 2025 录用', date: '2025-06-01', summary: '一篇关于免训练 NAS 的论文被 ICCV 2025 录用。', content: '一篇关于免训练 NAS 的论文被 ICCV 2025 录用。', category: 'achievement' },
  { title: '一篇关于小样本学习的论文被 ICML 2025 录用', date: '2025-05-01', summary: '一篇关于小样本学习的论文被 ICML 2025 录用。', content: '一篇关于小样本学习的论文被 ICML 2025 录用。', category: 'achievement' },
  { title: '一篇关于小样本学习的论文被 IJCAI 2025 录用', date: '2025-04-01', summary: '一篇关于小样本学习的论文被 IJCAI 2025 录用。', content: '一篇关于小样本学习的论文被 IJCAI 2025 录用。', category: 'achievement' },
  { title: '课题组常年招收硕士研究生、本科生及校外实习生', date: '2026-01-08', summary: '欢迎对人工智能研究感兴趣、有自驱力的同学加入。', content: '课题组常年招收硕士研究生、本科生和校外实习生。基本要求：热爱人工智能，有自驱力，情绪稳定。\n\n课题组与新加坡南洋理工大学、香港科技大学、香港浸会大学、日本国立富山大学、四川大学、西安电子科技大学等高校保持良好合作关系。', category: 'general', pinned: 1 },
];

const PROJECTS = [
  { name: '国家自然科学基金项目', description: '作为项目负责人主持国家自然科学基金项目。', category: '国家级', status: 'ongoing', start_year: 2027, end_year: 2029, funding: '' },
  { name: '中央高校基本科研业务费项目', description: '作为项目负责人主持中央高校基本科研业务费项目。', category: '校级', status: 'ongoing', start_year: 2026, end_year: 2027, funding: '' },
  { name: '东北大学科研启动经费', description: '作为项目负责人主持东北大学科研启动资金项目。', category: '校级', status: 'ongoing', start_year: 2025, end_year: 2030, funding: '' },
];

// 项目-成员关联（成员 ID 按插入顺序 1 = 康海东）
const PROJECT_MEMBERS = [
  { project: 1, members: [1] },
  { project: 2, members: [1] },
  { project: 3, members: [1] },
];

/** 若数据库为空则写入种子数据，返回是否执行了初始化 */
function seedIfEmpty() {
  const { c } = db.prepare('SELECT COUNT(*) AS c FROM members').get();
  if (c > 0) return false;

  const insertSite = db.prepare('INSERT OR REPLACE INTO site (key, value) VALUES (?, ?)');
  const insertMember = db.prepare(
    'INSERT INTO members (name, name_en, title, type, research_direction, email, bio) VALUES (?, ?, ?, ?, ?, ?, ?)'
  );
  const insertResearch = db.prepare(
    'INSERT INTO research_directions (name, name_en, description) VALUES (?, ?, ?)'
  );
  const insertPub = db.prepare(
    'INSERT INTO publications (title, authors, venue, year, type, abstract, link, member_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
  );
  const insertNews = db.prepare(
    'INSERT INTO news (title, date, summary, content, category, pinned) VALUES (?, ?, ?, ?, ?, ?)'
  );
  const insertProject = db.prepare(
    'INSERT INTO projects (name, description, category, status, start_year, end_year, funding) VALUES (?, ?, ?, ?, ?, ?, ?)'
  );
  const insertProjectMember = db.prepare('INSERT INTO project_members (project_id, member_id) VALUES (?, ?)');

  db.exec('BEGIN');
  try {
    SITE.forEach(([k, v]) => insertSite.run(k, v));
    MEMBERS.forEach((m) => insertMember.run(m.name, m.name_en, m.title, m.type, m.research_direction, m.email, m.bio));
    RESEARCH.forEach((r) => insertResearch.run(r.name, r.name_en, r.description));
    PUBLICATIONS.forEach((p) => insertPub.run(p.title, p.authors, p.venue, p.year, p.type, p.abstract ?? '', p.link ?? '', p.member_id ?? 1));
    NEWS.forEach((n) => insertNews.run(n.title, n.date, n.summary, n.content, n.category, n.pinned ?? 0));
    PROJECTS.forEach((p) => insertProject.run(p.name, p.description, p.category, p.status, p.start_year, p.end_year, p.funding ?? ''));
    PROJECT_MEMBERS.forEach((pm) => pm.members.forEach((mid) => insertProjectMember.run(pm.project, mid)));
    db.exec('COMMIT');
  } catch (e) {
    db.exec('ROLLBACK');
    throw e;
  }
  return true;
}

/** 若尚无管理员账号，则创建默认管理员 admin / admin123（请尽快修改） */
function ensureAdmin() {
  const { c } = db.prepare('SELECT COUNT(*) AS c FROM users').get();
  if (c > 0) return false;
  const { hashPassword } = require('./auth');
  const { salt, hash } = hashPassword('admin123');
  db.prepare('INSERT INTO users (username, password_hash, salt, role, created_at) VALUES (?, ?, ?, ?, ?)')
    .run('admin', hash, salt, 'admin', new Date().toISOString());
  return true;
}

if (require.main === module) {
  const seeded = seedIfEmpty();
  const admin = ensureAdmin();
  console.log(seeded ? '✅ 已写入种子数据' : '⚠️  数据库已有数据，跳过内容初始化');
  console.log(admin ? '✅ 已创建默认管理员 admin / admin123（请尽快修改）' : 'ℹ️  已存在管理员账号');
}

module.exports = { seedIfEmpty, ensureAdmin };
