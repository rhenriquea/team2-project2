<template>
  <MovieForm v-if="movie" :is-edit="true" :movie="movie" />
</template>

<script>
import MovieForm from '~/components/movie/MovieForm'

export default {
  components: {
    MovieForm,
  },
  middleware: 'auth',

  data: () => ({ movie: undefined }),

  async fetch() {
    const { id } = this.$route.params

    try {
      const { movie } = await this.$axios.$get(`/api/v1/movies/${id}`)
      this.movie = movie
    } catch (e) {
      this.$store.dispatch('showErrorMessage', e)
    }
  },
}
</script>
