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
const state = reactive({
  user: {}
})
onMounted(() => {
  fetchBorrowers()
})
async function fetchBorrowers() {
  const { data } = await $axios.get(DUE_API.BORROWERS_LIST, { params: { id: props.user.id } })
  console.log(data)
  state.user = data
}
</script>

<template>
  <div class="user">
    <h3 class="mb-2">Basic Information:</h3>
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
  &--basic {
    padding: 15px;
    border: 1px solid black;
    border-radius: 4px;
    display: grid;
    grid-template-columns: 50% auto;
  }
}
</style>
