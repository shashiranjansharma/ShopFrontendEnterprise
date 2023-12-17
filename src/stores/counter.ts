import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const x = reactive({
    y : 1
  })
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
