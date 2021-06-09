<template>
  <div>
    <Header />
    <main class="container">
      <Nuxt />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/layout/Header'
import Footer from '~/components/layout/Footer'

export default {
  components: { Header, Footer },
}
</script>

<style lang="scss" scoped>
main {
  padding-bottom: 5em;
}
</style>
