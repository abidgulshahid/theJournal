<template>
 <v-container width="1000">
    <v-row no-gutters class=" justify-center">
      <v-col cols="12" md="6" class=" justify-center">
        <v-card class="pa-4">
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            label="Username"
            v-model="username"
            type="text"
            required
          ></v-text-field>
          <v-text-field
            label="Password"
            v-model="password"
            type="password"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-center">
        <center>
        <v-btn :disabled="!passwordsMatch"  style="background-color: black; color: white; padding: 1%; text-align: center; width: 150px;" @click="login">Login</v-btn>
      </center>
      </v-card-actions>
      <v-card-subtitle class="text-center">
        <router-link to="/signup">Don't have an account? Sign up</router-link>
      </v-card-subtitle>
    </v-card>

        <!-- Snackbar for success message -->
        <v-snackbar
      v-model="showSnackbar"
      :timeout="snackbarTimeout"
      top
      right
    >
      {{ successMessage }}
    </v-snackbar>
    </v-col></v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth' // Import the Pinia store

const username = ref('')
const password = ref('')
const router = useRouter()
const authStore = useAuthStore() // Use the Pinia store
const showSnackbar = ref(false)
const successMessage = ref('')
const snackbarTimeout = 3000 // Snackbar will be visible for 3 seconds


const login = async () => {
  const success = await authStore.login(username.value, password.value)
  if (success) {
    router.push('/homepage') // Redirect to home page
  } else {
    showSnackbar.value = true
    successMessage.value = 'Login failed. Please check your credentials and try again.'
    
  }
}


const passwordsMatch = computed(() => {
   if (password.value != '') {
    return true
   }
})
</script>

<style scoped>
.v-container {
  padding-top: 100px;
}
</style>