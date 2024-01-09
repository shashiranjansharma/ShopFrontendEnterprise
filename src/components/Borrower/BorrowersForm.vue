<script lang="ts" setup>
import { reactive, inject } from 'vue'
import { DUE_API } from '../../endpoints'
import { epochToDate, toEpoch } from '../../utility'

const $axios: any = inject('$axios')
const ruleForm = reactive({
  f_name: '',
  l_name: '',
  phone: '',
  due_detail: {
    due_detail: '',
    total_money: 0 as number,
    due_date: toEpoch(new Date())
  }
})

const rules = reactive({
  f_name: [(v) => !!v || 'First Name is required'],
  l_name: [(v) => !!v || 'Last Name is required'],
  phone: [
    (v) => {
      if (v > 100000000 && /[0-9-]+/.test(v)) return true
      return 'Phone number needs to be at least 9 digits.'
    }
  ],
  due_detail: [(v) => !!v || 'Due is required'],
  total_money: [
    (v) => {
      if (v > 1 && /[0-9-]+/.test(v)) return true
      return 'Total number must be a number and greater than 1'
    }
  ],
  due_date: [(v) => !!v || 'Due date is required']
})

function updateDate(e: any) {
  ruleForm.due_detail.due_date = toEpoch(e)
  console.log(epochToDate(toEpoch(e)))
}

const submitForm = async () => {
  try {
    await $axios.post(DUE_API.BORROWERS_LIST, ruleForm)
    emit('success')
  } catch {
    //
  }
}


const emit = defineEmits(['success'])
</script>

<template>
  <v-form fast-fail @submit.prevent ref="ruleFormRef">
    <v-text-field v-model="ruleForm.f_name" label="First name" :rules="rules.f_name"></v-text-field>
    <v-text-field v-model="ruleForm.l_name" label="Last name" :rules="rules.l_name"></v-text-field>
    <v-text-field
      v-model.number="ruleForm.phone"
      label="Phone Number"
      :rules="rules.phone"
    ></v-text-field>
    <v-card class="my-3">
      <v-card-title>Transaction Details</v-card-title>
      <v-card-item>
        <v-text-field
          v-model="ruleForm.due_detail.due_detail"
          label="Transaction Detail"
          :rules="rules.due_detail"
        ></v-text-field>
        <v-text-field
          v-model.number="ruleForm.due_detail.total_money"
          label="Total money"
          :rules="rules.total_money"
        ></v-text-field>
        <v-text-field
          type="datetime-local"
          show-adjacent-months
          @update:modelValue="updateDate"
          :modelValue="epochToDate(ruleForm.due_detail.due_date)"
        />
      </v-card-item>
    </v-card>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="indigo-darken-3" variant="flat" @click="submitForm">Create</v-btn>
    </v-card-actions>
  </v-form>
</template>
