<script lang="ts" setup>
import { reactive, inject, ref } from 'vue'
import ProductForm from './ProductForm.vue'
import { PRODUCTS_API } from '../../endpoints'
import { type Products } from '../../interfaces'
import { debounce } from '@/utility'
import FilterBox from '../Common/Filter/FilterBox.vue'

const $axios: any = inject('$axios')

const filterRef = ref()

const tableConfig: any = ref([
  {
    key: 'name',
    title: 'Name',
    width: '10%',
    sortable: false
  },
  { key: 'description', title: 'Description', sortable: false },
  { key: 'category.name', title: 'Category', sortable: false, width: '10%' },
  { key: 'total', title: 'total', sortable: false, width: '10%' },
  { key: 'price', title: 'Price', sortable: false, width: '10%' },
  { key: 'operations', title: 'Operations', sortable: false, width: '10%' }
])

const state = reactive({
  tableData: [] as Products[],
  showCreate: false,
  loading: false,
  showEdit: false,
  selectedItem: {} as Products,
  search: '',
  total: 0,
  filter: {
    page: 1,
    page_size: 10,
    q: ''
  }
})

const debouncedUpdate = debounce(updateQuery)

function updateQuery(q: string) {
  state.search = q
}

async function fetchProducts() {
  try {
    state.loading = true
    const { data } = await $axios.get(PRODUCTS_API.ITEMS, { params: { ...state.filter } })
    state.tableData = data.results
    state.total = data.count
  } catch {
    //
  } finally {
    state.loading = false
  }
}

function onUpdatePage(e) {
  state.filter = { ...state.filter, page: e.page, q: e.search, page_size: e.itemsPerPage }
  fetchProducts()
}

function onCreateSuccess() {
  closeDrawer()
  filterRef.value?.resetFilter()
}

async function deleteProduct(row: any) {
  try {
    if (confirm('Are you sure you want to delete?')) {
      await $axios.put(PRODUCTS_API.REMOVE_ITEMS, { id: [row.id] })
      filterRef.value?.resetFilter()
    }
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
  state.showCreate = false
  state.showEdit = false
  state.selectedItem = {} as Products
}

function applyFilter(event: any) {
  state.filter = { ...state.filter, ...event, page: 1 }
  fetchProducts()
}
function resetFilter() {
  state.filter = { page: 1, page_size: 10, q: '' }
  fetchProducts()
}
</script>
<template>
  <div class="w-100 px-3">
    <v-card flat>
      <v-card-title class="d-flex align-center mb-3 px-0">
        <FilterBox
          ref="filterRef"
          :filterAPI="PRODUCTS_API.FILTER"
          @apply:filter="applyFilter"
          @reset:filter="resetFilter"
        />
        <v-spacer></v-spacer>
        <v-text-field
          :modelValue="state.search"
          prepend-inner-icon="mdi-magnify"
          density="compact"
          label="Search"
          single-line
          flat
          hide-details
          variant="solo-filled"
          @update:modelValue="debouncedUpdate"
        ></v-text-field>
        <v-btn color="primary" class="ml-3" @click="state.showCreate = true">+ Add</v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-data-table-server
        :headers="tableConfig"
        :items="state.tableData"
        :search="state.search"
        :itemsPerPage="state.filter.page_size"
        :page="state.filter.page"
        :itemsLength="state.total"
        :loading="state.loading"
        @update:options="onUpdatePage"
      >
        <template v-slot:[`item.operations`]="{ item }">
          <v-chip @click="deleteProduct(item)"><v-icon icon="mdi-delete" /></v-chip>
          <v-chip class="ml-3" @click="openEdit(item)"><v-icon icon="mdi-pencil" /></v-chip>
        </template>
      </v-data-table-server>
    </v-card>
    <v-row justify="center">
      <v-dialog
        v-model="state.showCreate"
        fullscreen
        :scrim="false"
        transition="dialog-top-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>{{
              state.showEdit ? 'Update Product' : 'Create Product'
            }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="closeDrawer">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <div class="pa-8">
            <ProductForm
              v-if="state.showEdit || state.showCreate"
              :formData="state.selectedItem || {}"
              @success="onCreateSuccess"
            />
          </div>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
