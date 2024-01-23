<script setup lang="ts">
import { reactive, inject, onMounted } from 'vue'
import { CATEGORY_API, PRODUCTS_API } from '../../endpoints'

const $axios: any = inject('$axios')

const props = defineProps({
  formData: { type: Object, default: () => ({}) }
})
const state = reactive({
  categories: [],
  updateForm: false
})
const ruleForm = reactive({
  name: '',
  description: '',
  barcode: '',
  total: '',
  price: '',
  category: null,
  category_type: '',
  id: ''
})

const rules = reactive({
  name: [(v: any) => !!v || 'Name is required'],
  description: [(v: any) => !!v || 'Details is required'],
  barcode: [(v: any) => !!v || 'Barcode is required'],
  total: [(v: any) => !!v || 'Total is required'],
  price: [(v: any) => !!v || 'Price is required'],
  category: [(v: any) => !!v || 'Please select category']
})

onMounted(() => {
  fetchCategories()
  if (props.formData?.name) {
    state.updateForm = true
    ruleForm.id = props.formData.id
    ruleForm.name = props.formData.name
    ruleForm.description = props.formData.description
    ruleForm.barcode = props.formData.barcode
    ruleForm.total = props.formData.total
    ruleForm.price = props.formData.price
    ruleForm.category = props.formData.category?.id
    ruleForm.category_type = props.formData.category?.category_type
  }

  console.log(ruleForm)
})

const fetchCategories = async () => {
  try {
    const { data } = await $axios.get(CATEGORY_API.CUSTOM_CATEGORY)
    state.categories = data
  } catch {
    //
  }
}

const submitForm = async () => {
  const cat: any = state.categories.find(
    (item: Record<string, any>) => item.id === ruleForm.category
  )
  const payload = {
    ...ruleForm,
    category: cat,
    category_type: cat.category_type
  }
  try {
    state.updateForm
      ? await $axios.put(PRODUCTS_API.ITEMS + payload?.id + '/', payload)
      : await $axios.post(PRODUCTS_API.ITEMS, payload)
    emit('success')
  } catch {
    //
  }
}

const emit = defineEmits(['success'])
</script>
<template>
  <v-form fast-fail @submit.prevent ref="ruleFormRef">
    <v-text-field v-model="ruleForm.name" label="Product Name" :rules="rules.name"></v-text-field>
    <v-text-field
      v-model="ruleForm.description"
      label="Description"
      :rules="rules.description"
    ></v-text-field>
    <v-text-field v-model="ruleForm.barcode" label="Barcode" :rules="rules.barcode"></v-text-field>
    <v-text-field v-model="ruleForm.total" label="Total" :rules="rules.total"></v-text-field>
    <v-text-field v-model="ruleForm.price" label="Price" :rules="rules.price"></v-text-field>
    <v-select
      :items="state.categories"
      :rules="rules.category"
      item-title="name"
      item-value="id"
      v-model="ruleForm.category"
      label="Select Type"
    ></v-select>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="indigo-darken-3" variant="flat" @click="submitForm">{{
        ruleForm.id ? 'Update' : 'Create'
      }}</v-btn>
    </v-card-actions>
  </v-form>
</template>
