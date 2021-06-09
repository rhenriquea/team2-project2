<template>
  <div class="admin">
    <div class="admin--header p">
      <h1>My Movies</h1>
      <AnchorButton to="admin/movie" icon="add" label="Add Movie" />
    </div>
    <ul class="admin--movies p-5">
      <li v-for="movie in movies" :key="movie.id">
        <MovieListItem :movie="movie" />
      </li>
    </ul>
  </div>
</template>

<script>
import MovieListItem from '~/components/movie/MovieListItem'
import AnchorButton from '~/components/forms/AnchorButton'

export default {
  components: {
    MovieListItem,
    AnchorButton,
  },
  data: () => ({
    movies: [],
  }),

  async fetch() {
    const { data } = await this.$axios.$get('/api/v1/movies')
    this.movies = data
  },

  activated() {
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch()
    }
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
</style>
