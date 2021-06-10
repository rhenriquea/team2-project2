<template>
  <movie-form />
</template>

<script>
import MovieForm from '~/components/movie/MovieForm'
export default {
  components: { MovieForm },
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
    const { data } = await this.$axios.$get('/movies')
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
