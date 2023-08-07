<script lang="ts" setup>
import { reactive, inject, onMounted } from 'vue'
import BorrowersForm from './BorrowersForm.vue'
import { DUE_API } from '../endpoints'

const $axios = inject('$axios')

interface User {
  full_name: string
  total_money?: number
  remaining_money?: number
  phone?: number
}

const state = reactive({
  tableData: [] as User[],
  drawer: false
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
</script>

<template>
  <div class="w-100 px-3">
    <div class="py-3 d-flex justify-between">
      <h2>Borrowers List</h2>
      <el-button type="primary" @click="state.drawer = true">Add Borrower</el-button>
    </div>
    <el-table :data="state.tableData" style="width: 100%" row-class-name="tableRowClassName">
      <el-table-column prop="full_name" label="Name" width="180" />
      <el-table-column prop="phone" label="Phone" />
      <el-table-column prop="total_money" label="Total Due" width="180" />
      <el-table-column prop="remaining_money" label="Remaining" width="180" />
    </el-table>
    <el-drawer v-model="state.drawer" title="Create Borrower" class="p-0" size="50%">
      <BorrowersForm @success="onCreateSuccess" />
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
