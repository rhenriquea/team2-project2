<template>
  <v-card>
    <div class="d-flex flex-no-wrap">
      <v-avatar class="mt-6" size="125" tile>
        <v-img height="250" :src="coverURL"></v-img>
      </v-avatar>
      <div class="d-md-flex">
        <v-sheet max-width="40vw">
          <v-card-title class="text-h5" v-text="movie.title"></v-card-title>
          <v-card-subtitle>
            {{ movie.year }}
            <v-rating
              :value="movie.rating"
              color="amber"
              dense
              half-increments
              readonly
              small
            ></v-rating>
          </v-card-subtitle>
          <v-card-text>
            {{ movie.description }}
          </v-card-text>
        </v-sheet>

        <div v-if="movie.actors.length > 1">
          <v-list class="transparent" dense>
            <v-subheader><strong> Actors</strong></v-subheader>
            <v-list-item v-for="actor in movie.actors" :key="actor">
              <v-list-item-title>{{ actor }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </div>

        <div v-if="movie.genres.length > 1">
          <v-list class="transparent" dense>
            <v-subheader><strong> Genres</strong></v-subheader>
            <v-list-item v-for="genre in movie.genres" :key="genre">
              <v-list-item-title>{{ genre }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
      </div>
    </div>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text color="primary" :to="`/${movie._id}`"> Details </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    movie: undefined,
  },
  computed: {
    coverURL() {
      return `${process.env.BASE_URL || 'https://moovp2.herokuapp.com'}/${
        this.movie.cover
      }`
    },
  },
}
</script>

<style lang="scss" scoped>
.movie {
  a {
    color: unset;
    text-decoration: none;
  }

  &__line {
    display: flex;
    overflow: hidden;

    h3 {
      font-size: 1.2em;
      line-height: 1.3;
      margin: 0;
      margin: 5px 0;
    }
  }

  &__content {
    width: 100%;
    .actions {
      display: none;
    }

    &:hover {
      background-color: #191919;

      .actions {
        display: block;
      }
    }
  }

  &__thumbnail {
    background-position: center center;
    background-size: cover;
    height: 150px;

    @include mq($breakpoint-sm) {
      min-width: 150px;
    }
  }

  &__category {
    margin-left: 5px;
  }

  &__description {
    color: #c1c1c1;
    font-size: 14px;
    line-height: 16px;
  }

  &__footer {
    font-size: 14px;
    strong {
      color: #777;
      font-weight: 300;
    }
  }
}
</style>
