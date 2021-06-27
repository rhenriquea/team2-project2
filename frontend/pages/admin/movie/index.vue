<template>
  <MovieForm />
</template>

<script>
import MovieForm from '~/components/movie/MovieForm'

export default {
  components: {
    MovieForm,
  },
  middleware: 'auth',
}
</script>
