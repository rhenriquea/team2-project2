<template>
  <div class="movie-card mx-auto mb" tile max-width="344" dark>
    <img :src="movie.cover" alt="card cover" />

    <div class="movie-card--content">
      <h1 class="movie-card--title">{{ movie.title }}</h1>
      <div class="movie-card--subtitle">{{ movie.year }}</div>

      <p class="movie-card--info">
        <strong>Genres:</strong>
        <span> {{ movie.genres.toString() }} </span>
      </p>

      <p class="movie-card--info">
        <strong>Actors:</strong>
        <span> {{ movie.actors.toString() }} </span>
      </p>

      <div class="movie-card--text mb">
        <h4>Summary</h4>
        <p>{{ movie.description }}</p>
      </div>

      <div class="movie-card--actions">
        <AnchorButton :to="`/${movie.id}`" icon="add" label="Information" />
      </div>
    </div>
  </div>
</template>

<script>
import AnchorButton from '../forms/AnchorButton'
export default {
  components: { AnchorButton },
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.movie-card {
  background-color: #191919;
  border-radius: 0.25em;

  cursor: pointer;
  width: 95%;

  &--content {
    padding: 1em;
  }

  &--title {
    font-size: 24px;
    font-weight: 400;
  }

  &--subtitle {
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 20px;
  }

  &--text {
    background: #2f2f2f;
    border-radius: 0.25em;
    font-size: 14px;
    line-height: 20px;
    min-height: 15em;
    overflow: hidden;
    padding: 1em;
    position: relative;
  }

  &--info {
    font-size: 14px;
    strong {
      color: #777;
      font-weight: 300;
    }
  }
}
</style>
