<script lang="ts" setup>
import { reactive, inject, onMounted } from 'vue'
import CategoryForm from './CategoryForm.vue'
import { CATEGORY_API } from '../../endpoints'

interface Category {
  name: string
  description: string
  category_type: string
}

const $axios: any = inject('$axios')

const state = reactive({
  tableData: [] as Category[],
  showCreate: false
})

onMounted(async () => {
  await fetchCustomCategory()
})

async function fetchCustomCategory() {
  try {
    const { data } = await $axios.get(CATEGORY_API.CUSTOM_CATEGORY)
    state.tableData = data || []
  } catch {
    //
  }
}

async function onDelete(event: any) {
  if (confirm(`Are you sure?`))
    try {
      await $axios.put(CATEGORY_API.CUSTOM_CATEGORY, { id: [event.id] })
      fetchCustomCategory()
    } catch {
      //
    }
}

function onCreateSuccess() {
  closeDrawer()
  fetchCustomCategory()
}

function closeDrawer() {
  state.showCreate = false
}
</script>

<template>
  <div class="w-100 px-3">
    <div class="py-1 d-flex justify-between header-main">
      <h2>Categories</h2>
      <el-button type="primary" @click="state.showCreate = true">+ Add</el-button>
    </div>
    <el-table :data="state.tableData" style="width: 100%" row-class-name="tableRowClassName">
      <el-table-column prop="name" label="Name" width="200" />
      <el-table-column prop="description" label="Description" />
      <el-table-column prop="category_type" label="Type" width="180" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click="onDelete(row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
      v-model="state.showCreate"
      :title="'Create Category'"
      class="p-0"
      size="50%"
      :zIndex="1000"
      @close="closeDrawer"
    >
      <CategoryForm v-if="state.showCreate" @success="onCreateSuccess" />
    </el-drawer>
  </div>
</template>

<style lang="scss">
.header-main {
  border-top: 1px solid #a39c9c;
  border-bottom: 1px solid #a39c9c;
}
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
.el-drawer__title {
  font-size: 24px;
  font-weight: 600;
  color: black;
}
.el-drawer__header {
  margin-bottom: 0 !important;
}
</style>
