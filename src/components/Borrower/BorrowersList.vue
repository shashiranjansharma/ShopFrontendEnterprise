<script lang="ts" setup>
import { reactive, inject, ref } from 'vue'
import BorrowersForm from './BorrowersForm.vue'
import { DUE_API } from '../../endpoints'
import BorrowersDetails from './BorrowersDetails.vue'
import EditBorrowers from './EditBorrowers.vue'
import { type User } from '../../interfaces'
import { debounce } from '@/utility'

const $axios: any = inject('$axios')

const tableConfig: any = ref([
  {
    key: 'full_name',
    title: 'Name',
    sortable: false
  },
  { key: 'phone', title: 'Phone', sortable: false, width: '20%' },
  { key: 'total_money', title: 'Total Due', sortable: false, width: '10%' },
  { key: 'remaining_money', title: 'Remaining', sortable: false, width: '10%' },
  { key: 'operations', title: 'Operations', sortable: false, width: '10%' }
])

const state = reactive({
  search: '',
  loading: false,
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
  total: 0
})

const debouncedUpdate = debounce(updateQuery)

function updateQuery(q: string) {
  state.search = q
}

async function fetchBorrowers() {
  try {
    state.loading = true
    const { data } = await $axios.get(DUE_API.BORROWERS_LIST, { params: { ...state.filter } })
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
  fetchBorrowers()
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
  state.selectedUser = {} as User
}
</script>

<template>
  <div class="w-100 px-3">
    <v-card flat>
      <v-card-title class="d-flex align-center mb-3 px-0">
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
          <v-chip @click="openDetail(item)"><v-icon icon="mdi-eye" /></v-chip>
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
              state.showDetail
                ? 'Transaction Details'
                : state.showEdit
                ? 'Update Transaction'
                : 'Create Transaction'
            }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="closeDrawer">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <div class="pa-8">
            <BorrowersDetails v-if="state.showDetail" :user="state.selectedUser" />
            <EditBorrowers
              v-else-if="state.showEdit"
              :user="state.selectedUser"
              @success="onCreateSuccess"
            />
            <BorrowersForm v-else @success="onCreateSuccess" />
          </div>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
