<template>
  <FeaturedMovie :movie="movie" :allow-edit="true" />
</template>

<script>
import FeaturedMovie from '~/components/movie/FeaturedMovie'

export default {
  components: {
    FeaturedMovie,
  },
  data: () => ({
    movie: undefined,
  }),

  async fetch() {
    const { id } = this.$route.params

    try {
      const { movie } = await this.$axios.$get(`/api/v1/movies/${id}`)
      this.movie = movie
    } catch (e) {
      this.$store.dispatch('showErrorMessage', e)
      this.$router.push('/')
    }
  },
}
</script>
