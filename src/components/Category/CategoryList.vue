<script lang="ts" setup>
import { reactive, inject, onMounted, ref } from 'vue'
import CategoryForm from './CategoryForm.vue'
import { CATEGORY_API } from '../../endpoints'
import { debounce } from '@/utility'

interface Category {
  name: string
  description: string
  category_type: string
}

const $axios: any = inject('$axios')
const tableConfig: any = ref([
  {
    key: 'name',
    title: 'Name',
    sortable: false,
    width: '20%'
  },
  { key: 'description', title: 'Description', sortable: false },
  { key: 'category_type', title: 'Type', sortable: false, width: '10%' },
  { key: 'operations', title: 'Operations', sortable: false, width: '10%' }
])

const state = reactive({
  search: '',
  loading: false,
  tableData: [] as Category[],
  showCreate: false,
  filter: {
    q: ''
  },
  total: 0
})

onMounted(async () => {
  await fetchCustomCategory()
})

const debouncedUpdate = debounce(updateQuery)

function updateQuery(q: string) {
  state.search = q
}

async function fetchCustomCategory() {
  try {
    state.loading = true
    const { data } = await $axios.get(CATEGORY_API.CUSTOM_CATEGORY, { params: { ...state.filter } })
    state.tableData = data || []
    state.total = data.count
  } catch {
    //
  } finally {
    state.loading = false
  }
}

function onUpdatePage(e) {
  state.filter = { ...state.filter, q: e.search }
  fetchCustomCategory()
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
    <v-card flat>
      <v-card-title class="d-flex align-center">
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
      <v-data-table-virtual
        :headers="tableConfig"
        :items="state.tableData"
        :search="state.search"
        :loading="state.loading"
        :hide-default-footer="true"
        @update:options="onUpdatePage"
      >
        <template v-slot:[`item.operations`]="{ item }">
          <v-chip @click="onDelete(item)"><v-icon icon="mdi-delete" /></v-chip>
        </template>
      </v-data-table-virtual>
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
            <v-toolbar-title>{{ 'Create category' }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="closeDrawer">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <div class="pa-8">
            <CategoryForm v-if="state.showCreate" @success="onCreateSuccess" />
          </div>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
