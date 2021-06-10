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
    const { data } = await this.$axios.$get('/movies')
    this.movie = data.find((p) => p.id.toString() === this.$route.params.id)
  },
}
</script>
