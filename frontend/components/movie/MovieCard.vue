<template>
  <v-card dark outlined elevation="2">
    <v-img height="250" :src="coverURL"></v-img>

    <v-card-title>{{ movie.title }}</v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :value="rating"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ms-4">{{ movie.rating }} ({{ score }})</div>
      </v-row>

      <div class="my-4 text-subtitle-1">Year • {{ movie.year }}</div>

      <div>
        {{ description }}
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions class="py-4">
      <v-btn text color="primary" :to="`/${movie._id}`"> Details </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
// import AnchorButton from '../forms/AnchorButton'
export default {
  // components: { AnchorButton },
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  computed: {
    description() {
      let description = this.movie.description
      if (description.length > 120) {
        description = `${description.substring(0, 120)} ...`
      }
      return description
    },
    coverURL() {
      return `${process.env.BASE_URL || 'https://moovp2.herokuapp.com'}/${
        this.movie.cover
      }`
    },
    score() {
      return Math.round((this.movie.rating / 5) * 100) + '%'
    },
    rating() {
      return this.movie.rating
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

  &--cover {
    height: 150px;
  }

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
