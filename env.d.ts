/// <reference types="vite/client" />
import { type defineComponent } from 'vue';
import "js-cookie";

declare module 'vue';
declare module 'axios';
declare module "js-cookie" {
  interface CookiesStatic {
    myCustomMethod?(key: string): string;
  }
}
declare module '@/utility';
declare module '*.vue' {
  export default defineComponent;
}
