<template>
  <v-row align="center" justify="center">
    <v-card v-if="movie" dark class="pt-4" min-width="70vw">
      <v-btn class="mb-3" text @click="$router.go(-1)">
        <v-icon left dark> mdi-chevron-left </v-icon>
        Back
      </v-btn>

      <!-- DELETE OVERLAY -->
      <v-overlay :absolute="absolute" :value="overlay" opacity="0.8">
        <v-card class="mx-auto" max-width="50vw" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">ARE YOU SURE?</div>
              <v-list-item-title class="text-h5 mb-1">
                Deleting {{ movie.title }}
              </v-list-item-title>
              <v-list-item-subtitle
                >You are about to delete {{ movie.title }} from your movies. If
                you want to proceed, confirm below.
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-avatar class="ma-3" size="125" tile>
              <v-img :src="movie.cover"></v-img>
            </v-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn outlined rounded text @click="overlay = false">
              Cancel
            </v-btn>
            <v-btn color="red" outlined rounded text @click="confirmDelete">
              <v-icon left dark> mdi-delete </v-icon>Delete</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-overlay>

      <section
        class="featured--cover"
        :style="{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImage: `url(${coverURL})`,
        }"
      >
        <div class="featured--horizontal-transparency">
          <div class="featured--vertical-transparency">
            <v-card-title class="display-3">
              <strong>
                {{ movie.title }}
              </strong>
            </v-card-title>
            <v-card-subtitle>
              <span>
                {{ movie.year }}
              </span>
              <v-rating
                :value="movie.rating"
                color="amber"
                class="mt-1"
                dense
                half-increments
                readonly
                medium
              ></v-rating>
            </v-card-subtitle>

            <v-card-text class="featured--description"
              >{{ description }}

              <v-row>
                <v-col class="p-0">
                  <v-list class="transparent" dense>
                    <v-subheader><strong> Genres</strong></v-subheader>
                    <v-list-item v-for="genre in movie.genres" :key="genre">
                      <v-list-item-title>{{ genre }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-col>
                <v-col class="p-0">
                  <v-list class="transparent" dense>
                    <v-subheader><strong> Actors</strong></v-subheader>
                    <v-list-item v-for="actor in movie.actors" :key="actor">
                      <v-list-item-title>{{ actor }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions v-if="isAuthenticated">
              <v-btn color="primary" outlined :to="`admin/movie/${movie._id}`">
                <v-icon left dark> mdi-pencil </v-icon> Edit</v-btn
              >
              <v-btn color="red" outlined @click="deleteOverlay">
                <v-icon left dark> mdi-delete </v-icon>Delete</v-btn
              >
            </v-card-actions>
          </div>
        </div>
      </section>
    </v-card>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    movie: undefined,
    allowEdit: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    rating: 4,
    absolute: true,
    overlay: false,
  }),
  methods: {
    deleteOverlay() {
      this.overlay = !this.overlay
    },
    confirmDelete() {
      console.log('Confirm Delete')
    },
  },
  computed: {
    description() {
      let description = this.movie.description
      if (description.length > 200) {
        description = `${description.substring(0, 200)} ...`
      }
      return description
    },
    coverURL() {
      return `${process.env.BASE_URL || 'https://moovp2.herokuapp.com'}/${
        this.movie.cover
      }`
    },
    ...mapGetters(['isAuthenticated']),
  },
  methods: {
    deleteOverlay() {
      this.overlay = !this.overlay
    },
    async confirmDelete() {
      try {
        await this.$axios.$delete(`/api/v1/admin/movies/${this.movie._id}`)
        this.$store.dispatch('showSuccessMessage', 'Movie Deleted!')
        this.$router.push('/admin')
      } catch (e) {
        this.$store.dispatch('showErrorMessage', e)
      }
    },
  },
}
</script>

<style lang="scss">
.featured {
  &--cover {
    height: 75vh;
  }

  &--horizontal-transparency {
    background: linear-gradient(to top, #111 10%, transparent 90%);
    height: inherit;
    width: inherit;
  }

  &--vertical-transparency {
    background: linear-gradient(to right, #111 30%, transparent 70%);
    display: flex;
    flex-direction: column;
    height: inherit;
    justify-content: center;
    padding-bottom: 100px;
    padding-left: 30px;
    padding-top: 70px;
    width: inherit;
  }

  &--title {
    font-size: 4em;
  }

  &--description {
    color: #999;
    margin-top: 15px;
    max-width: 40%;

    @media (max-width: 760px) {
      font-size: 14px;
      margin-right: 30px;
      max-width: 100%;
    }
  }

  &--genres {
    color: #999;
    font-size: 15px;
    strong {
      font-weight: 400;
    }
  }

  &--buttons {
    margin-top: 20px;
  }
}
</style>
