<template>
  <v-app dark>
    <v-alert v-if="error.response" prominent type="error">
      <v-row align="center">
        <v-col class="grow">
          <h1>{{ error.response.data.status }}</h1>
          <p>{{ error.response.data.message }}</p>
        </v-col>
        <v-col class="shrink">
          <v-btn to="/">Homepage</v-btn>
        </v-col>
      </v-row>
    </v-alert>
    <h1 v-else>
      {{ otherError }}
    </h1>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
  mounted() {
    console.log(this.error)
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
