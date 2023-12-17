<script lang="ts" setup>
import { reactive, inject } from 'vue'
import { DUE_API } from '@/endpoints'
import { convertEpochToDate } from '@/utility'
import { onMounted } from 'vue'
import { User } from './interfaces'

const $axios: any = inject('$axios')

const props = defineProps({
  user: {
    type: Object,
    default: () => ({})
  }
})
const state = reactive({
  user: {} as User
})
onMounted(() => {
  fetchBorrowers()
})
async function fetchBorrowers() {
  const { data } = await $axios.get(DUE_API.BORROWERS_LIST, { params: { id: props.user.id } })
  state.user = data
}
</script>

<template>
  <div class="user">
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
    <h3 class="mb-1 mt-3">Transaction Details:</h3>
    <div
      :class="`mb-2 user--transaction user--transaction-${due.transaction_type ? 'pay' : 'due'}`"
      v-for="due in state.user.transaction_history"
      :key="due.id"
    >
      <div class="d-flex justify-between">
        <div class="label">{{ convertEpochToDate(due.transaction_date) }}</div>
        <div class="label">{{ `RS: ${due.total_money}` }}</div>
      </div>
      <p>{{ due.transaction_detail }}</p>
    </div>
  </div>
</template>
<style lang="scss">
.user {
  color: black;
  .label {
    font-size: 14px;
    font-weight: bold;
  }
  .value {
    font-size: 14px;
    font-weight: 400;
  }
  &--basic,
  &--transaction {
    padding: 15px;
    border-radius: 4px;
    display: grid;
    min-height: 80px;
  }
  &--basic {
    grid-template-columns: 50% auto;
  }
  &--transaction-pay {
    background-color: rgb(202, 255, 237);
    border-color: green !important;
  }
  &--transaction-due {
    background-color: rgb(255, 220, 219);
    border-color: red !important;
  }
}
</style>
../../interfaces
