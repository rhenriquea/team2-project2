<template>
  <div class="admin">
    <div v-if="totalMovies > 0">
      <div class="admin--header p">
        <h1>My Movies</h1>
      </div>
      <ul class="admin--movies p-5">
        <li v-for="movie in movies" :key="movie.id">
          <MovieListItem :movie="movie" />
        </li>
      </ul>
    </div>

    <div v-else class="no-movies">
      <v-card>
        <v-card-title>My Movies</v-card-title>
        <v-card-text>
          You don't have any movies. Click the button below to add it.
        </v-card-text>
        <v-card-actions class="text-center">
          <v-btn color="green" to="admin/movie">Add Movie</v-btn>
        </v-card-actions>
      </v-card>
    </div>

    <div v-if="totalMovies >= 3" class="text-center mt-10">
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
import MovieListItem from '~/components/movie/MovieListItem'

export default {
  components: {
    MovieListItem,
  },
  middleware: 'auth',
  scrollToTop: true,
  data: () => ({
    movies: [],
    pageCount: 1,
    totalMovies: 0,
    page: 1,
  }),

  async fetch() {
    try {
      const { data, count } = await this.$axios.$get('/api/v1/admin/movies')
      this.movies = data

      console.log(data)
      this.totalMovies = count
      this.pageCount = Math.ceil(count / 3)
    } catch (e) {
      this.$store.dispatch('showErrorMessage', e)
      this.$router.push('/')
    }
  },

  mounted() {
    window.scrollTo({ top: 0 })
  },

  activated() {
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch()
    }
  },

  methods: {
    async pageChange(nextPage) {
      const { data } = await this.$axios.$get(
        `/api/v1/admin/movies?page=${nextPage}`
      )
      this.movies = data
    },
  },
}
</script>

<style lang="scss" scoped>
.admin {
  &--header {
    align-items: center;
    background: #2f2f2f;
    display: flex;
    justify-content: space-between;
  }

  &--movies {
    margin-top: 30px;

    li {
      border-bottom: 1px solid #ccc;
      margin-top: 10px;
      &:last-child {
        border-bottom: 0;
      }
    }
  }
}

.no-movies {
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  margin: 0 auto;
  max-width: 50vw;
}
</style>
