<script setup lang="ts">
import { reactive, inject, onMounted } from 'vue'
import { CATEGORY_API } from '../../endpoints'

const $axios: any = inject('$axios')

interface CategoryType {
  id: string
  label: string
}
const ruleForm = reactive({
  name: '',
  description: '',
  category_type: ''
})

const state = reactive({
  categoryTypes: [] as CategoryType[]
})

const rules = reactive({
  name: [(v: any) => !!v || 'Name is required'],
  description: [(v: any) => !!v || 'Description is required'],
  category_type: [(v: any) => !!v || 'Type is required']
})

onMounted(() => {
  fetchCategoryTypes()
})

async function fetchCategoryTypes() {
  try {
    const { data } = await $axios.get(CATEGORY_API.TYPE)
    state.categoryTypes = data || []
  } catch {
    //
  }
}

const submitForm = async () => {
  try {
    await $axios.post(CATEGORY_API.CUSTOM_CATEGORY, ruleForm)
    emit('success')
  } catch {
    //
  }
}

const emit = defineEmits(['success'])
</script>

<template>
  <v-form fast-fail @submit.prevent ref="ruleFormRef">
    <v-text-field v-model="ruleForm.name" label="Name" :rules="rules.name"></v-text-field>
    <v-text-field
      v-model="ruleForm.description"
      label="Description"
      :rules="rules.description"
    ></v-text-field>
    <v-select
      :items="state.categoryTypes"
      :rules="rules.category_type"
      item-title="label"
      item-value="id"
      v-model="ruleForm.category_type"
      label="Select Type"
    ></v-select>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="indigo-darken-3" variant="flat" @click="submitForm">Create</v-btn>
    </v-card-actions>
  </v-form>
</template>
