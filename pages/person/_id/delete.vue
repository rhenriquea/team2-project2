<template>
  <div v-if="person">
    <h1>Delete</h1>
    <p>{{ person }}</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    person: null,
  }),

  async fetch() {
    const { data } = await this.$axios.$get('/app/users')
    this.person = data.find((p) => p.id.toString() === this.$route.params.id)
  },
}
</script>
