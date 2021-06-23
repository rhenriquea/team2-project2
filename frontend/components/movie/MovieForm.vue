<template>
  <v-row justify="center" class="mb-5">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card ref="form" outlined>
        <v-btn class="mb-3" text @click="$router.go(-1)">
          <v-icon left dark> mdi-chevron-left </v-icon>
          Back
        </v-btn>
        <div v-if="isEdit">
          <v-img :src="coverURL" aspect-ratio="1.7"></v-img>
          <v-card-title class="display-1">
            <strong>{{ title }}</strong>
          </v-card-title>
        </div>

        <div v-else>
          <v-card-title class="display-1">
            <strong>Create Movie</strong>
          </v-card-title>
        </div>

        <v-divider></v-divider>

        <v-card-text>
          <p>
            <span>Movie Title:</span>
            <v-text-field ref="title" v-model="title" required></v-text-field>
          </p>

          <p>
            <span>Movie Rating:</span>
            <v-rating
              v-model="rating"
              class="mt-3"
              color="yellow darken-3"
              background-color="grey darken-1"
              empty-icon="$ratingFull"
              half-increments
              dense
              hover
              medium
            ></v-rating>
          </p>

          <p>
            <span>Movie Year:</span>
            <v-text-field
              v-model="year"
              type="number"
              min="1900"
              max="2099"
              step="1"
            />
          </p>

          <p>
            <span>Movie Cover:</span>
            <v-file-input
              ref="cover"
              v-model="cover"
              :rules="coverRules"
              accept="image/png, image/jpeg, image/jpg"
              placeholder="Pick a movie cover"
              prepend-icon="mdi-camera"
            ></v-file-input>
          </p>

          <p>
            <span>Movie Description:</span>
            <v-textarea
              ref="description"
              v-model="description"
              autocomplete="off"
              resize="false"
              placeholder="Movie Description"
              required
            ></v-textarea>
          </p>

          <p>
            <span>Movie Actors:</span>
            <v-container fluid>
              <v-combobox
                v-model="selected_actors"
                :items="actors"
                :search-input.sync="searchActor"
                hide-selected
                label=""
                multiple
                persistent-hint
                small-chips
              >
                <template #no-data>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        No results matching "<strong>{{ searchActor }}</strong
                        >". Press <kbd>enter</kbd> to create a new one
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-combobox>
            </v-container>
          </p>

          <p>
            <span>Genres:</span>

            <v-combobox
              v-model="selected_genres"
              :items="genres"
              outline
              chips
              clearable
              multiple
              solo
              dense
            >
              <template #selection="{ attrs, item, select, selected }">
                <v-chip
                  v-bind="attrs"
                  :input-value="selected"
                  close
                  small
                  @click="select"
                  @click:close="remove(item)"
                >
                  <strong>{{ item }}</strong>
                </v-chip>
              </template>
            </v-combobox>
          </p>
        </v-card-text>
        <v-divider class="mt-5"></v-divider>
        <v-card-actions>
          <v-btn text @click="$router.go(-1)"> Cancel </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click.prevent="submit"> Submit </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    movie: undefined,
  },
  data: (vm) => ({
    title: '',
    cover: null,
    description: '',
    rating: 0,
    coverRules: [
      (value) =>
        !value ||
        value.size < 10000000 ||
        'Cover size should be less than 10 MB!',
    ],
    actors: [],
    selected_actors: [],
    searchActor: null,
    year: 2021,
    selected_genres: [],
    genres: [
      'Action',
      'Adventure',
      'Animation',
      'Biography',
      'Comedy',
      'Crime',
      'Documentary',
      'Drama',
      'Family',
      'Fantasy',
      'Film Noir',
      'Game Show',
      'History',
      'Horror',
      'Musical',
      'Music',
      'Mystery',
      'News',
      'Reality-TV',
      'Romance',
      'Sci-Fi',
      'Short',
      'Sport',
      'Talk-Show',
      'Thriller',
      'War',
      'Western',
    ],
  }),

  computed: {
    coverURL() {
      return `${process.env.BASE_URL || 'https://moovp2.herokuapp.com'}/${
        this.movie.cover
      }`
    },
  },
  watch: {
    actors(val) {
      if (val.length > 5) {
        this.$nextTick(() => this.actors.pop())
      }
    },
  },

  mounted() {
    if (this.isEdit) {
      console.log(this.movie)
      this.title = this.movie.title
      this.description = this.movie.description
      this.year = this.movie.year
      this.rating = this.movie.rating
      this.selected_actors = this.movie.actors
      this.actors = this.movie.actors
      this.selected_genres = this.movie.genres
    }
  },

  methods: {
    remove(genre) {
      this.selected_genres.splice(this.selected_genres.indexOf(genre), 1)
      this.selected_genres = [...this.selected_genres]
    },
    resetForm() {
      Object.keys(this.form).forEach((f) => {
        this.$refs[f].reset()
      })
    },
    async submit() {
      const formData = new FormData()

      formData.append('title', this.title)
      formData.append('year', this.year)
      formData.append('description', this.description)
      formData.append('rating', this.rating)
      formData.append('actors', this.selected_actors)
      formData.append('genres', this.selected_genres)

      const cover = !this.cover ? this.movie && this.movie.cover : this.cover

      formData.append('cover', cover)

      this.$axios.setHeader('Content-Type', 'multipart/form-data')

      if (!this.isEdit) {
        try {
          await this.$axios.$post(`/api/v1/admin/movies`, formData)
          this.$store.dispatch('showSuccessMessage', 'Movie Added!')
          this.$router.push('/admin')
        } catch (e) {
          this.$store.dispatch('showErrorMessage', e)
        }
      } else {
        try {
          await this.$axios.$put(
            `/api/v1/admin/movies/${this.movie._id}`,
            formData
          )
          this.$store.dispatch('showSuccessMessage', 'Your changes are saved')
        } catch (e) {
          this.$store.dispatch('showErrorMessage', e)
        }
      }

      this.$axios.setHeader('Content-Type', 'application/json')
    },
  },
}
</script>

<style lang="scss" scoped></style>
