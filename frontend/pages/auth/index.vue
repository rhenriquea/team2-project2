<template>
  <div class="login-page">
    <AuthForm @submit="submit" />
    <div class="d-flex justify-center">
      <p>
        You need to <nuxt-link to="/signup">Register</nuxt-link> to use the
        system
      </p>
    </div>
  </div>
</template>

<script>
import AuthForm from '../../components/auth/AuthForm.vue'
export default {
  components: { AuthForm },
  data: () => ({
    email: null,
    password: null,
  }),
  methods: {
    async submit(payload) {
      try {
        const { token, user } = await this.$axios.$post(
          '/api/v1/auth/login',
          payload
        )
        this.$store.dispatch('setJWTToken', { token })
        this.$store.dispatch('setUser', { user })
        this.$store.dispatch('showSuccessMessage', 'Logged in!')
        this.$router.push('/')
      } catch (e) {
        this.$store.dispatch('showErrorMessage', e)
      }
    },
  },
}
</script>
