<script setup lang="ts">
import { inject, onMounted } from 'vue'
import { reactive } from 'vue'

const $axios: any = inject('$axios')

const props = defineProps({
  filterAPI: { type: String, default: '' }
})

const emit = defineEmits(['reset:filter', 'apply:filter'])

const state = reactive({
  selectOptions: {} as Record<string, any>,
  selectedFilter: {} as Record<string, any>,
  optionsLoading: false,
  filterModel: []
})

onMounted(async () => {
  try {
    state.optionsLoading = true
    const { data } = await $axios.get(props.filterAPI)
    state.filterModel = data.filter((i: any) => i.qp_key !== 'q')
  } catch (error: any) {
    console.log(error)
  }
  state.filterModel.forEach((item: any) => {
    getOptions(item)
  })
  state.optionsLoading = false
})

function getOptions(item: any) {
  if (item.get_options === 'url') {
    $axios
      .get(item.options)
      .then((res: any) => {
        state.selectOptions[item.qp_key] = res?.data
      })
      .catch((e: any) => {
        console.log(e)
      })
  } else state.selectOptions[item.qp_key] = item.options || []
}

function resetFilter() {
  state.selectedFilter = {}
  emit('reset:filter')
}

defineExpose({ resetFilter })
</script>
<template>
  <div>
    <v-menu location="end" :close-on-content-click="false" class="mb-4">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" class="ma-2" color="indigo" icon="mdi-filter"></v-btn>
      </template>
      <v-list v-if="!state.optionsLoading" class="filter-area">
        <v-list-item v-for="(item, index) in state.filterModel" :key="index">
          <div class="box">
            <h4>{{ item.label }}</h4>
            <v-autocomplete
              v-if="item.filter_type === 'single-select'"
              :items="state.selectOptions[item.qp_key]"
              v-model="state.selectedFilter[item.qp_key]"
              chips
              closable-chips
              color="blue-grey-lighten-2"
              item-title="label"
              item-value="value"
            />
            <v-slider
              v-if="item.filter_type === 'int-range'"
              v-model="state.selectedFilter[item.qp_key]"
              class="align-center px-1"
              thumb-label
              :max="state.selectOptions[item.qp_key][1]"
              :min="state.selectOptions[item.qp_key][0]"
              hide-details
            />
          </div>
        </v-list-item>
        <v-btn class="apply" color="primary" @click="$emit('apply:filter', state.selectedFilter)"
          >Apply</v-btn
        >
        <v-btn class="apply mr-3" @click="resetFilter">Reset</v-btn>
      </v-list>
    </v-menu>
  </div>
</template>
<style lang="scss" scoped>
.filter-area {
  padding: 15px 10px;
  width: 300px;
  .apply {
    float: right;
  }
}
</style>
