<script lang="ts" setup>
import { reactive, inject, onMounted } from 'vue'
import ProductForm from './ProductForm.vue'
import { PRODUCTS_API } from '../../endpoints'
import { type Products } from '../../interfaces'
import axios from 'axios'

const $axios: any = inject('$axios')

const state = reactive({
  tableData: [] as Products[],
  showCreate: false,
  showDetail: false,
  showEdit: false,
  selectedItem: {} as Products,
  filter: {
    page: 1,
    page_size: 10,
    q: ''
  },
  total: 100
})

onMounted(async () => {
  await fetchProducts()
})

async function fetchProducts() {
  try {
    const { data } = await $axios.get(PRODUCTS_API.ITEMS, { params: { ...state.filter } })
    state.tableData = data.results
    state.total = data.count
  } catch {
    //
  }
}

function previous() {
  if (state.filter.page > 1) {
    state.filter.page--
    fetchProducts()
  }
}
function next() {
  if (state.filter.page * state.filter.page_size < state.total) {
    state.filter.page++
    fetchProducts()
  }
}

function onCreateSuccess() {
  closeDrawer()
  fetchProducts()
}
// function openDetail(row: any) {
//   state.showDetail = true
//   state.showCreate = true
//   state.selectedItem = row
// }
function deleteProduct(row: any) {
  try {
    if (confirm('Are you sure you want to delete?'))
      $axios.put(PRODUCTS_API.REMOVE_ITEMS, { id: [row.id] })
  } catch (e) {
    console.log(e)
  }
}
function openEdit(row: any) {
  state.showEdit = true
  state.showCreate = true
  state.selectedItem = row
}
function closeDrawer() {
  state.showDetail = false
  state.showCreate = false
  state.showEdit = false
  state.selectedItem = {} as Products
}
</script>

<template>
  <div class="w-100 px-3">
    <div class="py-1 d-flex justify-between header-main">
      <h2>Products</h2>
      <el-button type="primary" @click="state.showCreate = true">+ Add</el-button>
    </div>
    <el-table :data="state.tableData" style="width: 100%" row-class-name="tableRowClassName">
      <el-table-column prop="name" width="200" label="Name" />
      <el-table-column prop="description" label="Description" />
      <el-table-column prop="category.name" label="Category" width="180" />
      <el-table-column prop="price" label="Price" width="180" />
      <el-table-column prop="total" label="Total" width="180" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click="deleteProduct(row)">Delete</el-button>
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
        state.showDetail ? 'Product Details' : state.showEdit ? 'Update Product' : 'Add Product'
      "
      class="p-0"
      size="50%"
      :zIndex="1000"
      @close="closeDrawer"
    >
      <ProductForm
        v-if="state.showEdit || state.showCreate"
        :formData="state.selectedItem || {}"
        @success="onCreateSuccess"
      />
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
