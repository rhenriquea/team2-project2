<template>
  <div>
    <v-row>
      <v-col v-for="movie in movies" :key="movie._id" cols="4">
        <MovieCard :movie="movie" />
      </v-col>
    </v-row>
    <div v-if="totalMovies >= 6" class="text-center mt-10">
      <v-pagination
        v-model="page"
        :length="pageCount"
        :total-visible="7"
        circle
        @input="pageChange"
      ></v-pagination>
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
      pageCount: 1,
      totalMovies: 0,
      page: 1,
    }
  },

  async fetch() {
    const { data, count } = await this.$axios.$get('/api/v1/movies')
    this.movies = data
    this.totalMovies = count
    this.pageCount = Math.ceil(count / 6)
  },

  activated() {
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch()
    }
  },

  methods: {
    async pageChange(nextPage) {
      const { data } = await this.$axios.$get(`/api/v1/movies?page=${nextPage}`)
      this.movies = data
    },
  },
}
</script>
