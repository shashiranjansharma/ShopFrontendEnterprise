<script lang="ts" setup>
import { reactive, inject, onMounted } from 'vue'
import BorrowersForm from './BorrowersForm.vue'
import { DUE_API } from '../endpoints'
import BorrowersDetails from './BorrowersDetails.vue'

const $axios = inject('$axios')

interface User {
  full_name: string
  total_money?: number
  remaining_money?: number
  phone?: number
}

const state = reactive({
  tableData: [] as User[],
  drawer: false,
  showDetail: false,
  selectedUser: {} as User
})

onMounted(async () => {
  await fetchBorrowers()
})

async function fetchBorrowers() {
  try {
    const { data } = await $axios.get(DUE_API.BORROWERS_LIST)
    state.tableData = data.results
  } catch {
    //
  }
}

function onCreateSuccess() {
  state.drawer = false
  fetchBorrowers()
}
function openDetail(row: any) {
  state.showDetail = true
  state.drawer = true
  state.selectedUser = row
}
function closeDrawer() {
  state.showDetail = false
  state.drawer = false
  state.selectedUser = {}
}
</script>

<template>
  <div class="w-100 px-3">
    <div class="py-1 d-flex justify-between header-main">
      <h2>Borrowers List</h2>
      <el-button type="primary" @click="state.drawer = true">Add Borrower</el-button>
    </div>
    <el-table :data="state.tableData" style="width: 100%" row-class-name="tableRowClassName">
      <el-table-column prop="full_name" label="Name" />
      <el-table-column prop="phone" label="Phone" width="200" />
      <el-table-column prop="total_money" label="Total Due" width="180" />
      <el-table-column prop="remaining_money" label="Remaining" width="180" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click="openDetail(row)">Detail</el-button>
          <el-button link type="primary" size="small">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
      v-model="state.drawer"
      :title="state.showDetail ? 'Borrowers Detail' : 'Create Borrower'"
      class="p-0"
      size="50%"
      z-index="99999"
      @close="closeDrawer"
    >
      <BorrowersDetails v-if="state.showDetail" :user="state.selectedUser" />
      <BorrowersForm v-else @success="onCreateSuccess" />
    </el-drawer>
  </div>
</template>

<style>
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
