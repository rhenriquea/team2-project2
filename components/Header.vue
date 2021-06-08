<template>
  <v-app-bar fixed app dark elevate-on-scroll>
    <nuxt-link to="/">
      <v-img
        class="mx-7"
        max-height="80"
        max-width="80"
        src="/moov.png"
      ></v-img>
    </nuxt-link>

    <v-btn link to="/"> Movies</v-btn>

    <v-spacer></v-spacer>

    <v-btn text to="/auth">
      <v-icon>mdi-login</v-icon>
      Login
    </v-btn>
  </v-app-bar>
</template>
