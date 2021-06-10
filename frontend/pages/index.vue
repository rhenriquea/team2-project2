<template>
  <div class="row">
    <div
      v-for="movie in movies"
      :key="movie.id"
      class="col-12 col-md-6 col-lg-3"
    >
      <MovieCard :movie="movie" />
    </div>
  </div>
</template>

<script>
import MovieCard from '~/components/movie/MovieCard'

export default {
  components: {
    MovieCard,
  },
  data() {
    return {
      movies: [],
    }
  },

  async fetch() {
    const { data } = await this.$axios.$get('/movies')

    this.movies = data
  },

  activated() {
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch()
    }
  },
}
</script>
