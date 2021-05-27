<template>
  <v-app>
    <v-app-bar fixed app color="white" elevate-on-scroll>
      <nuxt-link to="/">
        <v-img max-height="150" max-width="150" src="/logo.png"></v-img>
      </nuxt-link>
      <!--       <nuxt-link to="/">
        <v-img max-height="150" max-width="150" src="/logo2.png"></v-img>
      </nuxt-link> -->

      <v-btn text to="/"> List</v-btn>

      <v-spacer></v-spacer>

      <v-btn text to="/login">
        <v-icon>mdi-login</v-icon>
        Login
      </v-btn>

      <v-btn text to="/signup">
        <v-icon>mdi-note</v-icon>
        Register
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer class="d-flex justify-center flex-column" app>
      <span>Team 02 - Brigham Young University Idaho</span>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>
