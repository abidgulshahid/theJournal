<template>
  <v-container >
    <v-row no-gutters class=" justify-center">
      <v-col cols="12" md="6" class=" justify-center">
        <v-card class="pa-4 mx-auto mt-5" max-width="580">
          <v-card-title>Welcome, {{ user }}</v-card-title>
          <v-textarea 
            v-model="journalText" 
            label="Share you're thoughts" 
            variant="outlined">
          </v-textarea>
          
          <v-card-actions>
            <v-btn style="background-color: black; color: white;" @click="submitJournalEntry">
              Submit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Snackbar for success message -->
      <v-snackbar
        v-model="showSnackbar"
        :timeout="snackbarTimeout"
        top
        right
      >
        {{ successMessage }}
      </v-snackbar>
    </v-row>

    <v-row no-gutters class=" justify-center pt-10">
   
      <!-- Card to disply journal entries -->
      <v-col cols="12" md="6" class=" justify-center">
     
      </v-col>
    </v-row>

    <!-- NQW ONE -->
     
    <v-card class="mx-auto mt-5" max-width="580" border flat v-for="entry in journalEntries" :key="entry._id">
    <v-list-item class="px-6" height="88">
      <template v-slot:prepend>
        <v-avatar color="surface-light" size="32">🎯</v-avatar>
      </template>

    
      <template v-slot:title> <b>Readability: </b> {{ entry.readability }} </template>

      <template v-slot:append>
       
                     {{ entry.tone}}
             
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-card-text class="text-medium-emphasis pa-6">
      <v-list>
              <v-list-item-group v-if="journalEntries.length > 0">
                <v-list-item>
                  <v-list-item-content>

                    <p>
                    {{ entry.text }}
                  </p>
                  </v-list-item-content>
                 
                </v-list-item>
              </v-list-item-group>
              <v-list-item v-else>
                <v-list-item-content>No journal entries available.</v-list-item-content>
              </v-list-item>
            </v-list>

          
    </v-card-text>
    <v-divider></v-divider>
            <v-list-item class="px-6" height="88">
      <template v-slot:prepend>
        <v-avatar color="surface-light" size="32">🎯</v-avatar>
      </template>

      <template v-slot:title> {{ new Date(entry.date).toLocaleString() }} </template>

<template v-slot:append>
  <v-list-item-action>
              <v-btn color="black" @click="deleteJournalEntry(entry._id)">
               Delete
              </v-btn>
            </v-list-item-action>
</template>

    </v-list-item>

    
  </v-card>


  </v-container>
</template>
 <script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

// Get user data from localStorage
const user = computed(() => localStorage.getItem('username'))
const access_token = computed(() => localStorage.getItem('access_token'))
const full_name = computed(() => localStorage.getItem('full_name'))
const email = computed(() => localStorage.getItem('email'))
const location = computed(() => localStorage.getItem('location'))

const journalText = ref('')
const showSnackbar = ref(false)
const successMessage = ref('')
const snackbarTimeout = 2000 // Snackbar will be visible for 2 seconds
const text_standard = ref('')
const readability = ref('')

const journalEntries = ref([]) // Reactive variable to store journal entries

const submitJournalEntry = async () => {
  const success = await authStore.add(journalText.value, access_token.value)
  showSnackbar.value = true

  if (success) {
    successMessage.value = "Added"
    journalText.value = '' // Clear the textarea after submission
    listJournal() // Refresh the list of journal entries
  }
  else {
    successMessage.value = "Can't Submit Empty Thoughts"
    journalText.value = '' // Clear the textarea after submission

  }
}

const listJournal = async () => {
  const response = await authStore.list(access_token.value)
  if (response.data.text) {
    journalEntries.value = response.data.text.sort((a, b) => new Date(b.date) - new Date(a.date))
  }
}

const deleteJournalEntry = async (id) => {
  const success = await authStore.delete(id, access_token.value)
  if (success) {
    successMessage.value = "Deleted"
    showSnackbar.value = true
    listJournal() // Refresh the list of journal entries after deletion
  } else {
    successMessage.value = "Failed to delete"
    showSnackbar.value = true
  }
}

// Fetch the list of journal entries on component mount
listJournal()



 </script>
 
 <style scoped>
 .v-container {
   padding-top: 100px;
 }
 </style>