<template>
  <div>
    <AuthForm :is-login="false" @submit="submit" />
  </div>
</template>

<script>
export default {
  methods: {
    async submit(payload) {
      try {
        await this.$axios.$put('/api/v1/auth/signup', payload)
        this.$store.dispatch('showSuccessMessage', 'User successfuly created')
        this.$router.push('/auth')
      } catch (e) {
        this.$store.dispatch('showErrorMessage', e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.login-page {
  position: relative;
  top: 25vh;
}
</style>
