<script lang="ts" setup>
import { reactive, ref, inject } from 'vue'
import { DUE_API } from '../endpoints'

const $axios = inject('$axios')

const formSize = ref('default')
const ruleFormRef = ref()
const ruleForm = reactive({
  f_name: '',
  l_name: '',
  phone: '',
  due_detail: {
    due_detail: '',
    total_money: 0 as number,
    due_date: Math.trunc(new Date().getTime() / 1000)
  }
})

const rules = reactive({
  f_name: [
    { required: true, message: 'Please input first name', trigger: 'blur' },
    { min: 3, max: 25, message: 'Length should be 3 to 5', trigger: 'blur' }
  ],
  l_name: [{ min: 3, max: 25, message: 'Length should be 3 to 5', trigger: 'blur' }],
  phone: [
    { required: true, message: 'Please input phone number', trigger: 'blur' },
    { min: 10, max: 15, message: 'Length should be 3 to 5', trigger: 'blur' }
  ],
  'due_detail.due_detail': [{ required: true, message: 'Please input detail', trigger: 'blur' }],
  'due_detail.total_money': [
    { required: true, message: 'Please input total due', trigger: 'blur' },
    { type: 'number', message: 'Total due must be a number' }
  ],
  'due_detail.due_date': [{ required: true, message: 'Please select due date', trigger: 'blur' }]
})

const submitForm = async (formEl: any) => {
  if (!formEl) return
  await formEl.validate(async (valid: boolean, fields: any) => {
    if (valid) {
      try {
        await $axios.post(DUE_API.BORROWERS_LIST, ruleForm)
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
    label-width="120px"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <el-form-item label="First name" prop="f_name">
      <el-input v-model="ruleForm.f_name" />
    </el-form-item>
    <el-form-item label="Last name" prop="l_name">
      <el-input v-model="ruleForm.l_name" />
    </el-form-item>
    <el-form-item label="Phone" prop="phone">
      <el-input v-model="ruleForm.phone" type="number" />
    </el-form-item>
    <label>Due Details</label>
    <div>
      <el-form-item label="Due Detail" prop="due_detail.due_detail">
        <el-input v-model="ruleForm.due_detail.due_detail" />
      </el-form-item>
      <el-form-item label="Total money" prop="due_detail.total_money">
        <el-input v-model.number="ruleForm.due_detail.total_money" type="number" />
      </el-form-item>
      <el-form-item label="Due Date" prop="due_detail.due_date">
        <el-date-picker
          v-model="ruleForm.due_detail.due_date"
          type="date"
          label="Pick a date"
          placeholder="Pick a date"
          style="width: 100%"
        />
      </el-form-item>
    </div>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"> Create </el-button>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>
