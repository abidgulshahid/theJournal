<template>
  <v-container width="1000">
    <v-row no-gutters class=" justify-center">
      <v-col cols="12" md="6" class=" justify-center">
        <v-card class="pa-4 mt-0">
      <v-card-title>Sign Up</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            label="Full Name"
            v-model="full_name"
            type="text"
            required
          ></v-text-field>
          <v-text-field
            label="Username"
            v-model="username"
            type="text"
            required
          ></v-text-field>
          <v-text-field
            label="Email"
            v-model="email"
            type="email"
            required
          ></v-text-field>
          <v-text-field
            label="Location"
            v-model="location"
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
        <v-btn :disabled="!passwordsMatch" style="background-color: black; color: white; padding: 1%; text-align: center; width: 150px;" @click="signup">Sign Up</v-btn>
      </v-card-actions>
      <v-card-subtitle class="text-center">
        <router-link to="/login">Already have an account? Login</router-link>
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
const full_name = ref('')
const location = ref('')
const email = ref('')
const router = useRouter()
const authStore = useAuthStore() // Use the Pinia store

const showSnackbar = ref(false)
const successMessage = ref('')
const snackbarTimeout = 3000 // Snackbar will be visible for 3 seconds

const signup = async () => {
  const userData = {
    username: username.value,
    password: password.value,
    full_name: full_name.value,
    location: location.value,
    email: email.value
  }

  const { success, message } = await authStore.signup(userData)

  successMessage.value = message
  showSnackbar.value = true

  if (success) {
    // Redirect to login page after a short delay
    setTimeout(() => {
      router.push('/login')
    }, snackbarTimeout)
  }
}

const passwordsMatch = computed(() => {
   if (password.value != '' && username.value != '' && location.value != '' && email.value !='' && full_name.value !='') {
    return true
   }
})
</script>

<style scoped>
.v-container {
  padding-top: 100px;
}
</style>