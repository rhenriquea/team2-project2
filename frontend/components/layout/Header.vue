<template>
  <v-app-bar
    absolute
    app
    elevate-on-scroll
    scroll-target="#scrolling-techniques-7"
  >
    <router-link to="/">
      <v-img height="80" width="80" src="/moov.png"></v-img>
    </router-link>
    <v-toolbar-title class="ml-3">Movie Management System</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn v-if="!isAuthenticated" to="/auth">
      Login
      <v-icon>mdi-login</v-icon>
    </v-btn>
    <v-btn v-else @click="logout">
      Logout
      <v-icon>mdi-logout</v-icon>
    </v-btn>

    <v-btn v-if="isAuthenticated" to="/admin">
      Admin
      <v-icon>mdi-admin</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  methods: {
    logout() {
      this.$store.dispatch('setJWTToken', { token: null })
      this.$store.dispatch('showSuccessMessage', 'Logged out!')
      this.$router.push('/auth')
    },
  },
}
</script>
