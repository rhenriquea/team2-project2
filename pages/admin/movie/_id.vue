<template>
  <MovieForm v-if="movie" :is-edit="true" :movie="movie" />
</template>

<script>
import MovieForm from '~/components/movie/MovieForm'

export default {
  components: {
    MovieForm,
  },

  data: () => ({ movie: undefined }),

  async fetch() {
    const { data } = await this.$axios.$get('/api/v1/movies')
    this.movie = data.find((p) => p.id.toString() === this.$route.params.id)
  },

  methods: {
    submit() {
      this.$refs.form.validate()

      const updatedPerson = {
        id: this.person.id,
        first_name: this.first_name,
        last_name: this.last_name,
        job_title: this.job_title,
        email: this.email,
      }

      console.log(updatedPerson)
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
