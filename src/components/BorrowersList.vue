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
    <div class="py-3 d-flex justify-between">
      <h2>Borrowers List</h2>
      <el-button type="primary" @click="state.drawer = true">Add Borrower</el-button>
    </div>
    <el-table :data="state.tableData" style="width: 100%" row-class-name="tableRowClassName">
      <el-table-column prop="full_name" label="Name" width="300" />
      <el-table-column prop="phone" label="Phone" />
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
      @close="closeDrawer"
    >
      <BorrowersDetails v-if="state.showDetail" :user="state.selectedUser" />
      <BorrowersForm v-else @success="onCreateSuccess" />
    </el-drawer>
  </div>
</template>

<style>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
