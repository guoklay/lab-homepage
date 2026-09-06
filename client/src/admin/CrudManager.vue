<script setup>
import { ref, reactive, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { uploadImage } from '@/api';

const props = defineProps({
  title: { type: String, default: '' },
  columns: { type: Array, default: () => [] },
  fields: { type: Array, default: () => [] },
  load: { type: Function, required: true },
  create: { type: Function, required: true },
  update: { type: Function, required: true },
  remove: { type: Function, required: true },
  rowKey: { type: String, default: 'id' },
});

const list = ref([]);
const loading = ref(false);
const dialogVisible = ref(false);
const editingId = ref(null);
const saving = ref(false);
const form = reactive({});

function defaultFor(f) {
  if (f.type === 'number') return 0;
  if (f.type === 'switch') return false;
  if (f.type === 'multiselect') return [];
  if (f.type === 'select' && f.options?.length) return f.options[0].value;
  return '';
}

function emptyForm() {
  for (const f of props.fields) form[f.prop] = defaultFor(f);
}

async function fetchData() {
  loading.value = true;
  try {
    list.value = (await props.load()) || [];
  } catch (e) {
    list.value = [];
  } finally {
    loading.value = false;
  }
}

function openCreate() {
  editingId.value = null;
  emptyForm();
  dialogVisible.value = true;
}

function openEdit(row) {
  editingId.value = row[props.rowKey];
  for (const f of props.fields) {
    const v = row[f.prop];
    if (f.type === 'number') form[f.prop] = v ?? 0;
    else if (f.type === 'switch') form[f.prop] = !!v;
    else if (f.type === 'multiselect') form[f.prop] = Array.isArray(v) ? [...v] : [];
    else if (f.type === 'select')
      form[f.prop] = v === null || v === undefined || v === '' ? (f.options?.[0]?.value ?? '') : v;
    else form[f.prop] = v ?? '';
  }
  dialogVisible.value = true;
}

async function save() {
  for (const f of props.fields) {
    if (f.required && (form[f.prop] === '' || form[f.prop] === null || form[f.prop] === undefined)) {
      ElMessage.warning(`请填写「${f.label}」`);
      return;
    }
  }
  const payload = { ...form };
  saving.value = true;
  try {
    if (editingId.value != null) {
      await props.update(editingId.value, payload);
      ElMessage.success('已更新');
    } else {
      await props.create(payload);
      ElMessage.success('已新增');
    }
    dialogVisible.value = false;
    fetchData();
  } catch (e) {
    ElMessage.error(e?.response?.data?.error || '操作失败');
  } finally {
    saving.value = false;
  }
}

async function removeRow(row) {
  try {
    await ElMessageBox.confirm('确定删除这条记录吗？', '删除确认', {
      type: 'warning',
      confirmButtonText: '删除',
      cancelButtonText: '取消',
    });
  } catch (e) {
    return;
  }
  try {
    await props.remove(row[props.rowKey]);
    ElMessage.success('已删除');
    fetchData();
  } catch (e) {
    ElMessage.error(e?.response?.data?.error || '删除失败');
  }
}

async function handleUpload(opt, prop) {
  try {
    const data = await uploadImage(opt.file);
    form[prop] = data.url;
    ElMessage.success('上传成功');
  } catch (e) {
    ElMessage.error('上传失败');
  }
}

function cellValue(row, col) {
  const v = row[col.prop];
  if (col.map) return col.map[v] ?? v;
  if (col.formatter) return col.formatter(row);
  return v ?? '';
}

defineExpose({ reload: fetchData });
onMounted(fetchData);
</script>

<template>
  <div>
    <div class="crud-header">
      <div class="crud-title">{{ title }}</div>
      <div class="crud-actions">
        <slot name="toolbar" />
        <el-button type="primary" @click="openCreate">＋ 新增</el-button>
      </div>
    </div>

    <el-table v-loading="loading" :data="list" border stripe>
      <el-table-column
        v-for="c in columns"
        :key="c.prop"
        :prop="c.prop"
        :label="c.label"
        :width="c.width"
        :min-width="c.minWidth"
        show-overflow-tooltip
      >
        <template #default="{ row }">{{ cellValue(row, c) }}</template>
      </el-table-column>
      <el-table-column label="操作" width="140" fixed="right">
        <template #default="{ row }">
          <el-button link type="primary" @click="openEdit(row)">编辑</el-button>
          <el-button link type="danger" @click="removeRow(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="editingId != null ? '编辑' : '新增'" width="640px">
      <el-form label-width="110px">
        <el-form-item v-for="f in fields" :key="f.prop" :label="f.label">
          <el-input
            v-if="f.type === 'input' || !f.type"
            v-model="form[f.prop]"
            :placeholder="f.placeholder"
          />
          <el-input
            v-else-if="f.type === 'textarea'"
            v-model="form[f.prop]"
            type="textarea"
            :rows="3"
            :placeholder="f.placeholder"
          />
          <el-input-number v-else-if="f.type === 'number'" v-model="form[f.prop]" :min="0" />
          <el-switch v-else-if="f.type === 'switch'" v-model="form[f.prop]" />
          <el-select v-else-if="f.type === 'select'" v-model="form[f.prop]" style="width: 100%">
            <el-option v-for="o in f.options" :key="o.value" :label="o.label" :value="o.value" />
          </el-select>
          <el-select v-else-if="f.type === 'multiselect'" v-model="form[f.prop]" multiple style="width: 100%">
            <el-option v-for="o in f.options" :key="o.value" :label="o.label" :value="o.value" />
          </el-select>
          <template v-else-if="f.type === 'image'">
            <div class="image-field">
              <el-input v-model="form[f.prop]" :placeholder="f.placeholder || '图片地址'" />
              <el-upload
                :show-file-list="false"
                :http-request="(opt) => handleUpload(opt, f.prop)"
                accept="image/*"
              >
                <el-button>上传</el-button>
              </el-upload>
            </div>
            <div v-if="form[f.prop]" class="image-preview">
              <img :src="form[f.prop]" alt="预览" />
            </div>
          </template>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="saving" @click="save">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.crud-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.crud-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--lab-text);
}
.crud-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}
.image-field {
  display: flex;
  gap: 10px;
  width: 100%;
}
.image-preview {
  margin-top: 8px;
}
.image-preview img {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid var(--lab-border);
}
</style>
