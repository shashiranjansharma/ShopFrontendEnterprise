<script lang="ts" setup>
import { reactive, ref, inject, onMounted } from 'vue'
import { CATEGORY_API } from '../../endpoints'

const $axios: any = inject('$axios')

const formSize = ref('default')
const ruleFormRef = ref()

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
  name: [
    { required: true, message: 'Please input name', trigger: 'blur' },
    { min: 3, max: 25, message: 'Length should be 3 to 5', trigger: 'blur' }
  ],
  description: [{ min: 3, max: 50, message: 'Length should be 3 to 50', trigger: 'blur' }],
  category_type: [{ required: true, message: 'Please select type', trigger: 'blur' }]
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

const submitForm = async (formEl: any) => {
  if (!formEl) return
  await formEl.validate(async (valid: boolean, fields: any) => {
    if (valid) {
      try {
        await $axios.post(CATEGORY_API.CUSTOM_CATEGORY, ruleForm)
        emit('success')
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
      <el-input v-model="ruleForm.name" placeholder="Enter name" />
    </el-form-item>
    <el-form-item label="Description" prop="description">
      <el-input v-model="ruleForm.description" placeholder="Enter description" />
    </el-form-item>
    <el-form-item label="Type" prop="category_type">
      <!-- <el-input v-model="ruleForm.category_type" type="number" /> -->
      <el-select v-model="ruleForm.category_type" placeholder="Select Type">
        <el-option
          v-for="item in state.categoryTypes"
          :key="item.id"
          :label="item.label"
          :value="item.id"
        />
      </el-select>
    </el-form-item>

    <el-form-item class="footer">
      <el-button type="primary" @click="submitForm(ruleFormRef)"> Create </el-button>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
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
