<script lang="ts" setup>
import { reactive, ref, inject } from 'vue'
import { DUE_API } from '../../endpoints'
import { onMounted } from 'vue'
import { epochToDate, toEpoch } from '../../utility'

const $axios: any = inject('$axios')
const props = defineProps({
  user: {
    type: Object,
    default: () => ({})
  }
})

onMounted(() => {
  state.user = { ...state.user, ...props.user }
})

function updateDate(e: any) {
  state.user.transaction_details.transaction_date = toEpoch(e)
}

const state = reactive({
  user: {
    transaction_details: {
      transaction_details: '',
      total_money: 0 as number,
      transaction_date: toEpoch(new Date())
    }
  } as Record<string, any>,
  type: 'due'
})

const rules = ref({
  transaction_details: [(v) => !!v || 'Transaction details is required'],
  total_money: [(v) => !!v || 'Total is required'],
  transaction_date: [(v) => !!v || 'Transaction date is required']
})

const submitForm = async () => {
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
}
const emit = defineEmits(['success'])
</script>
<template>
  <v-card class="mb-6">
    <template v-slot:title>Transaction Details</template>
    <div class="d-flex justify-space-between w-100 px-4">
      <div class="mb-3">
        <p class="label">{{ `Name` }}</p>
        <p class="value">{{ state.user.full_name }}</p>
      </div>
      <div class="mb-3">
        <p class="label">{{ `Mobile` }}</p>
        <p class="value">{{ state.user.phone }}</p>
      </div>
    </div>
    <div class="mb-3 w-100 px-4">
      <p class="label">{{ `Total Due` }}</p>
      <p class="value">{{ state.user.total_money }}</p>
    </div>
  </v-card>
  <v-card class="pa-4">
    <v-form fast-fail @submit.prevent ref="ruleFormRef">
      <v-radio-group v-model="state.type" class="d-flex">
        <v-radio label="Buy" value="due"></v-radio>
        <v-radio label="Pay" value="pay"></v-radio>
      </v-radio-group>
      <v-text-field
        v-model="state.user.transaction_details.transaction_details"
        label="Transaction Details"
        :rules="rules.transaction_details"
      ></v-text-field>
      <v-text-field
        v-model.number="state.user.transaction_details.total_money"
        label="Amount"
        :rules="rules.total_money"
      ></v-text-field>
      <v-text-field
        type="datetime-local"
        :rules="rules.transaction_date"
        show-adjacent-months
        @update:modelValue="updateDate"
        :modelValue="epochToDate(state.user.transaction_details.transaction_date)"
      />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="indigo-darken-3" variant="flat" @click="submitForm">Create</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>
