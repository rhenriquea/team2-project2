<template>
  <v-card dark>
    <section
      class="featured--cover"
      :style="{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${item.backdrop_path})`,
      }"
    >
      <div class="featured--horizontal-transparency">
        <div class="featured--vertical-transparency">
          <v-card-title class="display-3 font-weight-bold pa-0">{{
            item.original_name
          }}</v-card-title>

          <v-rating
            v-model="rating"
            background-color="pink lighten-3"
            color="pink"
            small
          ></v-rating>
          <div class="featured--genres">
            <strong>Genres:</strong>
            {{ genres }}
          </div>

          <div class="featured--description">{{ description }}</div>
          <div class="featured--buttons">
            <span v-if="allowEdit">
              <v-btn outlined class="mt-5"
                ><v-icon>mdi-pencil</v-icon> Edit</v-btn
              >
              <v-btn outlined class="mt-5"
                ><v-icon>mdi-delete</v-icon> Delete</v-btn
              >
            </span>
          </div>
        </div>
      </div>
    </section>
  </v-card>
</template>
>

<script>
export default {
  props: {
    item: null,
    allowEdit: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    rating: 4,
  }),
  computed: {
    description() {
      let description = this.item.overview
      if (description.length > 200) {
        description = `${description.substring(0, 200)}...`
      }
      return description
    },
    genres() {
      const genres = []
      for (const i in this.item.genres) {
        genres.push(this.item.genres[i].name)
      }
      return genres.join(', ')
    },
  },
}
</script>

<style lang="scss">
.featured {
  &--cover {
    @media (max-width: 760px) {
      height: 90vh;
    }
  }

  &--horizontal-transparency {
    width: inherit;
    height: inherit;
    background: linear-gradient(to top, #111 10%, transparent 90%);
  }

  &--vertical-transparency {
    width: inherit;
    height: inherit;
    background: linear-gradient(to right, #111 30%, transparent 70%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 30px;
    padding-bottom: 100px;
    padding-top: 70px;
  }

  &--description {
    margin-top: 15px;
    color: #999;
    max-width: 40%;

    @media (max-width: 760px) {
      font-size: 14px;
      max-width: 100%;
      margin-right: 30px;
    }
  }

  &--genres {
    margin-top: 15px;
    font-size: 15px;
    color: #999;
  }
}
</style>
