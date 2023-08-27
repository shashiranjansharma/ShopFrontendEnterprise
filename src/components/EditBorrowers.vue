<script lang="ts" setup>
import { reactive, ref, inject } from 'vue'
import { DUE_API } from '../endpoints'
import { onMounted } from 'vue'

const $axios = inject('$axios')
const props = defineProps({
  user: {
    type: Object,
    default: () => ({})
  }
})

onMounted(() => {
  state.user = { ...state.user, ...props.user }
})

const formSize = ref('default')
const ruleFormRef = ref()
const state = reactive({
  user: {
    transaction_details: {
      transaction_details: '',
      total_money: 0 as number,
      transaction_date: new Date().getTime()
    }
  },
  type: 'due'
})

const rules = reactive({
  'transaction_details.transaction_details': [
    { required: true, message: 'Please input detail', trigger: 'blur' }
  ],
  'transaction_details.total_money': [
    { required: true, message: 'Please input total due', trigger: 'blur' },
    { type: 'number', message: 'Total due must be a number' }
  ],
  'transaction_details.transaction_date': [
    { required: true, message: 'Please select due date', trigger: 'blur' }
  ]
})

const submitForm = async (formEl: any) => {
  if (!formEl) return
  await formEl.validate(async (valid: boolean, fields: any) => {
    if (valid) {
      try {
        if (state.type === 'due') {
          const payload = {
            id: state.user.id,
            due_detail: {
              due_date: state.user.transaction_details.transaction_date,
              due_detail: state.user.transaction_details.transaction_details,
              total_money: state.user.transaction_details.total_money
            }
          }
          await $axios.put(DUE_API.BORROWERS_LIST, payload)
        } else {
          const payload = {
            id: state.user.id,
            payment_detail: {
              payment_date: state.user.transaction_details.transaction_date,
              payment_detail: state.user.transaction_details.transaction_details,
              total_money: state.user.transaction_details.total_money
            }
          }
          await $axios.post(DUE_API.MAKE_PAYMENT, payload)
        }
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
  <div>
    <h3 class="mb-1">Basic Information:</h3>
    <div class="user--basic">
      <div class="mb-3">
        <p class="label">{{ `Name` }}</p>
        <p class="value">{{ state.user.full_name }}</p>
      </div>
      <div class="mb-3">
        <p class="label">{{ `Mobile` }}</p>
        <p class="value">{{ state.user.phone }}</p>
      </div>
      <div class="mb-3">
        <p class="label">{{ `Total Due` }}</p>
        <p class="value">{{ state.user.total_money }}</p>
      </div>
    </div>
    <el-form
      ref="ruleFormRef"
      :model="state.user"
      :rules="rules"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <label class="el-form-item__label mt-3">Transaction Details</label>
      <div class="due-detail">
        <el-radio-group v-model="state.type">
          <el-radio label="due" size="small">Buy</el-radio>
          <el-radio label="pay" size="small">Pay</el-radio>
        </el-radio-group>
        <el-form-item label="Transaction Detail" prop="transaction_details.transaction_details">
          <el-input v-model="state.user.transaction_details.transaction_details" />
        </el-form-item>
        <el-form-item label="Total money" prop="transaction_details.total_money">
          <el-input v-model.number="state.user.transaction_details.total_money" type="number" />
        </el-form-item>
        <el-form-item label="Transaction Date" prop="transaction_details.transaction_date">
          <el-date-picker
            v-model="state.user.transaction_details.transaction_date"
            type="date"
            label="Pick a date"
            placeholder="Pick a date"
            format="DD MMM, YYYY"
            value-format="x"
            style="width: 100%"
          />
        </el-form-item>
      </div>
      <el-form-item class="footer">
        <el-button type="primary" @click="submitForm(ruleFormRef)"> Update </el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
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
.user {
  &--basic,
  &--transaction {
    padding: 15px;
    border: 1px solid black;
    border-radius: 4px;
    display: grid;
    min-height: 80px;
  }
  &--basic {
    grid-template-columns: 50% auto;
    color: black;
    .label {
      font-size: 14px;
      font-weight: bold;
    }
    .value {
      font-size: 14px;
      font-weight: 400;
    }
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
