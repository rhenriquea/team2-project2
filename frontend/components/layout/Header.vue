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

    <span v-if="isAuthenticated" class="d-flex">
      <v-btn to="/admin">
        <v-icon left>mdi-account-cowboy-hat</v-icon>
        <span class="d-none d-sm-block">{{ getUser.name }}</span>
      </v-btn>

      <v-btn @click="logout">
        <v-icon left>mdi-logout</v-icon>
        <span class="d-none d-sm-block">Logout</span>
      </v-btn>
    </span>

    <span v-else class="d-flex">
      <v-btn to="/signup">
        <v-icon left>mdi-badge-account</v-icon>
        <span class="d-none d-sm-block">Signup</span>
      </v-btn>

      <v-btn to="/auth">
        <v-icon left>mdi-login</v-icon>
        <span class="d-none d-sm-block">Login</span>
      </v-btn>
    </span>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  scrollToTop: true,
  computed: {
    ...mapGetters(['isAuthenticated', 'getUser']),
  },
  methods: {
    logout() {
      this.$store.dispatch('setJWTToken', { token: null })
      this.$store.dispatch('setUser', { user: null })
      this.$store.dispatch('showSuccessMessage', 'Logged out!')
      this.$router.push('/auth')
    },
  },
}
</script>
