<template>
  <v-row>
    <v-col>
      <v-card dark>
        <v-card-text>
          <h1>Create Movie</h1>
          <v-form ref="form" v-model="valid" dark lazy-validation>
            <v-text-field
              v-model="movie_cover"
              label="Cover"
              required
            ></v-text-field>

            <v-text-field v-model="movie_title" label="Title"></v-text-field>

            <label for="movie_rating" class="text--white">
              Rating
              <v-rating
                v-model="movie_rating"
                background-color="pink lighten-3"
                color="pink"
                small
              ></v-rating>
            </label>

            <v-textarea v-model="movie_description" label="Description" />

            <v-select
              v-model="movie_genres"
              :items="genres"
              label="Genres"
              attach
              chips
              multiple
            ></v-select>

            <v-card-actions>
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="submit"
              >
                Submit
              </v-btn>

              <v-btn color="error" class="mr-4" @click="reset">
                Reset Form
              </v-btn>

              <v-btn color="warning" @click="resetValidation">
                Reset Validation
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col>
      <span class="white--text">
        {{ movie_title }}
        {{ movie_rating }}
        {{ movie_description }}
        {{ movie_genres }}
      </span>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    movie_cover: '',
    movie_title: '',
    movie_description: '',
    movie_rating: 2,
    movie_genres: [],
    genres: ['Comedy', 'Action', 'Drama', 'Horror'],
  }),

  async fetch() {
    const { data } = await this.$axios.$get('/api/v1/movies')
    this.person = data.find((p) => p.id.toString() === this.$route.params.id)
  },

  methods: {
    submit() {
      this.$refs.form.validate()

      const createdPerson = {
        avatar: this.avatar,
        first_name: this.first_name,
        last_name: this.last_name,
        job_title: this.job_title,
        email: this.email,
      }

      console.log(createdPerson)
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
  },
}
</script>
