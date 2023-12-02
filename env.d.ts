/// <reference types="vite/client" />

declare module 'vue'
declare module 'axios'
declare module '@/utility'
declare module "*.vue" {
    import Vue from "vue";
    export default Vue;
 }
