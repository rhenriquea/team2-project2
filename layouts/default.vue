<template>
  <v-app class="dark">
    <Header />
    <v-main>
      <v-container class="container">
        <nuxt />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'

export default {
  components: { Header, Footer },
}
</script>

<style lang="scss" scoped>
.dark {
  background: #121212;
}
</style>
