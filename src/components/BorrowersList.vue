<script lang="ts" setup>
import { reactive, inject, onMounted } from 'vue'
import BorrowersForm from './BorrowersForm.vue'
import { DUE_API } from '../endpoints'
import BorrowersDetails from './BorrowersDetails.vue'
import EditBorrowers from './EditBorrowers.vue'

const $axios = inject('$axios')

interface User {
  full_name: string
  total_money?: number
  remaining_money?: number
  phone?: number
}

const state = reactive({
  tableData: [] as User[],
  showCreate: false,
  showDetail: false,
  showEdit: false,
  selectedUser: {} as User,
  filter: {
    page: 1,
    page_size: 10,
    q: ''
  },
  total: 100
})

onMounted(async () => {
  await fetchBorrowers()
})

async function fetchBorrowers() {
  try {
    const { data } = await $axios.get(DUE_API.BORROWERS_LIST, { params: { ...state.filter } })
    state.tableData = data.results
    state.total = data.count
  } catch {
    //
  }
}

function previous() {
  if (state.filter.page > 1) {
    state.filter.page--
    fetchBorrowers()
  }
}
function next() {
  if (state.filter.page * state.filter.page_size < state.total) {
    state.filter.page++
    fetchBorrowers()
  }
}

function onCreateSuccess() {
  closeDrawer()
  fetchBorrowers()
}
function openDetail(row: any) {
  state.showDetail = true
  state.showCreate = true
  state.selectedUser = row
}
function openEdit(row: any) {
  state.showEdit = true
  state.showCreate = true
  state.selectedUser = row
}
function closeDrawer() {
  state.showDetail = false
  state.showCreate = false
  state.showEdit = false
  state.selectedUser = {}
}
</script>

<template>
  <div class="w-100 px-3">
    <div class="py-1 d-flex justify-between header-main">
      <h2>Borrowers List</h2>
      <el-button type="primary" @click="state.showCreate = true">Add Borrower</el-button>
    </div>
    <el-table :data="state.tableData" style="width: 100%" row-class-name="tableRowClassName">
      <el-table-column prop="full_name" label="Name" />
      <el-table-column prop="phone" label="Phone" width="200" />
      <el-table-column prop="total_money" label="Total Due" width="180" />
      <el-table-column prop="remaining_money" label="Remaining" width="180" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click="openDetail(row)">Detail</el-button>
          <el-button link type="primary" size="small" @click="openEdit(row)">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="d-flex justify-content-center align-items-center w-100 pagination">
      <button class="pagination__btn" @click="previous" :disabled="state.filter.page <= 1">
        {{ '< Previous' }}
      </button>
      <span>{{
        `page: ${state.filter.page} of ${Math.ceil(state.total / state.filter.page_size)}`
      }}</span>
      <button
        class="pagination__btn"
        @click="next"
        :disabled="state.filter.page >= Math.ceil(state.total / state.filter.page_size)"
      >
        {{ 'Next >' }}
      </button>
    </div>
    <el-drawer
      v-model="state.showCreate"
      :title="
        state.showDetail
          ? 'Transaction Details'
          : state.showEdit
          ? 'Update Transaction'
          : 'Create Transaction'
      "
      class="p-0"
      size="50%"
      :zIndex="1000"
      @close="closeDrawer"
    >
      <BorrowersDetails v-if="state.showDetail" :user="state.selectedUser" />
      <EditBorrowers
        v-else-if="state.showEdit"
        :user="state.selectedUser"
        @success="onCreateSuccess"
      />
      <BorrowersForm v-else @success="onCreateSuccess" />
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
.pagination {
  background-color: #ffcdcd;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 15px 0;
  &__btn {
    height: 30px;
    border-radius: 50%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    font-weight: 800;
    color: rgb(40, 126, 126);
    background-color: rgb(128, 243, 243);
    cursor: pointer;
  }
}
</style>
