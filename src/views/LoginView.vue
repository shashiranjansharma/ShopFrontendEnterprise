<script setup lang="ts">
import { LOGIN_API } from '@/endpoints';
import { inject, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
const { login } = useAuthStore()

const $axios: any = inject('$axios')
const router = useRouter();


const ruleForm = reactive({
    username: '',
    password: '',
});


const rules = reactive({
    username: [(v: any) => !!v || 'Email is required', (value: any) => {
          if (/.+@.+\..+/.test(value)) return true
          return 'E-mail must be valid.'
        }],
    password: [(v: any) => !!v || 'Password is required'],
});

async function loginUser() {
    try {
    const { data } = await $axios.post(LOGIN_API.LOGIN, ruleForm)
    login(`Token ${data.token}`);
    router.push({ name: 'home' });
  } catch {
    //
  }
}
</script>

<template>
    <div class="login-view">
        <div class="login-view-left">
            <h1>Shop App</h1>
        </div>
        <div class="login-view-right">
            <v-form fast-fail  @submit.prevent ref="ruleFormRef">
                <h2>Login</h2>
                <v-text-field v-model="ruleForm.username" label="Email" :rules="rules.username"/>
                <v-text-field v-model="ruleForm.password" label="Password" :rules="rules.password"/>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="indigo-darken-3" variant="flat" @click="loginUser">Login</v-btn>
                </v-card-actions>
            </v-form>
        </div>
    </div>
</template>
<style lang="scss">
.login-view {
    display: grid;
    height: 100%;
    grid-template-columns: 50% 50%;
    &-left {
        background-color: blue;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
    }
    &-right {
        display: flex;
        align-items: center;
        justify-content: center;
        .v-form{
            width: 80%;
            h2 {
                margin-bottom: 15px;
            }
        }
    }
}
</style>