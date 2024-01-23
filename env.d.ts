/// <reference types="vite/client" />
import {type defineComponent} from 'vue'

declare module 'vue'
declare module 'axios'
declare module '@/utility'
declare module '*.vue' {
  export default defineComponent
}
