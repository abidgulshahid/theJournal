<template>
    <v-app-bar app  class="px-10" style="background-color: black; color: white;">
      <div class="d-flex align-center"  >
        <h2>The Journal</h2>
      </div>

      <v-spacer></v-spacer>

      <div v-if="access_token || isLoggedIn">
        <v-btn text to="/homepage">Home {{ total_entries || 5 }}</v-btn>
        <v-btn text to="/profile">Profile</v-btn>
        <v-btn @click="logout">Logout</v-btn>
      </div>
      <div v-else>
      <v-btn text to="/login">Login</v-btn>
      <v-btn  text to="/signup">Sign Up</v-btn>
      </div>
          <!-- Snackbar for success message -->
          <v-snackbar
      v-model="showSnackbar"
      :timeout="snackbarTimeout"
      top
      right
    >
      {{ successMessage }}
    </v-snackbar>


    </v-app-bar>
  </template>
  
<script setup>
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'

// Computed user data from localStorage
const user = computed(() => localStorage.getItem('username'))
const full_name = computed(()=> localStorage.getItem('full_name'))
const access_token = computed(()=> localStorage.getItem('access_token'))
const router = useRouter()

import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const isLoggedIn = computed(() => authStore.user !== null)
const getAccessToken = computed( () => authStore.access_token)
console.log(getAccessToken, 'getAccessToken')
const showSnackbar = ref(false)
const successMessage = ref('')
const snackbarTimeout = 3000 // Snackbar will be visible for 3 seconds


const logout = async () => {
  console.log(access_token.value, 'access_token.value in header file')
  const success = await authStore.logout(access_token.value)

  if (success){
    router.path('/login')
  }
  else {
    showSnackbar.value = true
    successMessage.value = 'Logout failed. Please Reload the page and try again.'
  }

}
</script>

<style scoped>
.v-app-bar {
  background-color: #1976D2; /* Vuetify primary color */
}

.v-btn {
  color: white;
}
</style>