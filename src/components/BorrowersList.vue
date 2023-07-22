<script lang="ts" setup>
import { ref } from 'vue'
import BorrowersForm from './BorrowersForm.vue'

interface User {
  f_name: string
  l_name: string
  address: string
  total_money?: number
  remaining_money?: number
  phone?: number
}

const drawer = ref(false)

const tableRowClassName = ({ row, rowIndex }: { row: User; rowIndex: number }) => {
  if (row && rowIndex === 1) {
    return 'warning-row'
  } else if (rowIndex === 3) {
    return 'success-row'
  }
  return ''
}

const tableData: User[] = [
  {
    f_name: 'Tom',
    l_name: 'Hardy',
    address: 'No. 189, Grove St, Los Angeles',
    total_money: 18000.0,
    remaining_money: 16000.0
  },
  {
    f_name: 'Tom',
    l_name: 'Hardy',
    address: 'No. 189, Grove St, Los Angeles',
    total_money: 18000.0,
    remaining_money: 16000.0
  },
  {
    f_name: 'Tom',
    l_name: 'Hardy',
    address: 'No. 189, Grove St, Los Angeles',
    total_money: 18000.0,
    remaining_money: 16000.0
  },
  {
    f_name: 'Tom',
    l_name: 'Hardy',
    address: 'No. 189, Grove St, Los Angeles',
    total_money: 18000.0,
    remaining_money: 16000.0
  }
]
</script>

<template>
  <div class="w-100 px-3">
    <div class="py-3 d-flex justify-between">
      <h2>Borrowers List</h2>
      <el-button type="primary" @click="drawer = true">Add Borrower</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column prop="f_name" label="Name" width="180" />
      <el-table-column prop="l_name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
      <el-table-column prop="total_money" label="Total Due" width="180" />
      <el-table-column prop="remaining_money" label="Remaining" width="180" />
    </el-table>
    <el-drawer v-model="drawer" title="I'm outer Drawer" class="p-0" size="50%">
      <BorrowersForm />
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
