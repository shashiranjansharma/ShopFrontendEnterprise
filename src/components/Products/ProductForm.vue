<script lang="ts" setup>
import { reactive, ref, inject, onMounted } from 'vue'
import { CATEGORY_API, PRODUCTS_API } from '../../endpoints'

const $axios: any = inject('$axios')

const props = defineProps({
  formData: { type: Object, default: () => ({}) }
})

const formSize = ref('default')
const ruleFormRef = ref()
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
  category: {},
  category_type: '',
  id: ''
})

const rules = reactive({
  name: [{ required: true, message: 'Please input name', trigger: 'blur' }],
  description: [{ required: true, message: 'Please input description', trigger: 'blur' }],
  barcode: [{ required: true, message: 'Please input barcode', trigger: 'blur' }],
  total: [{ required: true, message: 'Please specify total', trigger: 'blur' }],
  price: [{ required: true, message: 'Please input price', trigger: 'blur' }],
  category: [{ required: true, message: 'Please select category', trigger: 'blur' }]
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
    ruleForm.category = props.formData.category.id
    ruleForm.category_type = props.formData.category.category_type
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

const submitForm = async (formEl: any) => {
  if (!formEl) return
  await formEl.validate(async (valid: boolean, fields: any) => {
    if (valid) {
      const cat = state.categories.find(
        (item: Record<string, any>) => item.id === ruleForm.category
      )
      const payload = {
        ...ruleForm,
        category: cat,
        category_type: cat.category_type
      }
      try {
        state.updateForm
          ? await $axios.put(PRODUCTS_API.ITEMS, payload)
          : await $axios.post(PRODUCTS_API.ITEMS, payload)
        emit('success')
        resetForm(ruleFormRef.value)
      } catch {
        //
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: any) => {
  if (!formEl) return
  formEl.resetFields()
}

const emit = defineEmits(['success'])
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <el-form-item label="Name" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item label="Description" prop="description">
      <el-input v-model="ruleForm.description" />
    </el-form-item>
    <el-form-item label="Barcode" prop="barcode">
      <el-input v-model="ruleForm.barcode" />
    </el-form-item>
    <el-form-item label="Total" prop="total">
      <el-input v-model="ruleForm.total" type="number" />
    </el-form-item>
    <el-form-item label="Price" prop="price">
      <el-input v-model="ruleForm.price" type="number" />
    </el-form-item>
    <el-form-item label="Category" prop="category">
      <el-select v-model="ruleForm.category" class="w-100" placeholder="Select">
        <el-option
          v-for="item in state.categories"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item class="footer">
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        {{ state.updateForm ? 'Update' : 'Create' }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<style lang="scss">
.el-drawer {
  &__body {
    overflow-x: hidden !important;
  }
}
.el-form-item {
  flex-direction: column !important;
  max-width: 100% !important;
  &__label,
  &__content {
    display: block !important;
  }
}
.due-detail {
  max-width: 100%;
  width: 100%;
  padding: 15px;
  border: 1px solid gray;
  border-radius: 4px;
}
.footer {
  max-width: 100% !important;
  .el-form-item__content {
    width: 100% !important;
    display: flex !important;
    justify-content: right !important;
    margin-top: 15px;
    margin-right: 0 !important;
  }
}
</style>
