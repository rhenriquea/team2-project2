<template>
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

          <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>

          <v-btn color="warning" @click="resetValidation">
            Reset Validation
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
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
}
</script>
