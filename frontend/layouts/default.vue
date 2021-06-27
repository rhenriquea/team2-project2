<template>
  <v-app>
    <Header />

    <v-sheet
      id="scrolling-techniques-7"
      class="overflow-y-auto test"
      max-height="100vh"
    >
      <v-main>
        <v-container style="min-height: 1000px">
          <!--  Global Overlay Error Message -->
          <v-overlay v-if="showErrorMessage" opacity="0.8">
            <v-card
              class="mx-auto"
              max-width="50vw"
              outlined
              color="red darken-4"
            >
              <v-list-item v-if="errorObj" three-line>
                <v-list-item-content>
                  <div class="text-overline mb-4">
                    {{ errorObj.status }} Error
                  </div>
                  <v-list-item-title class="text-h5 mb-1">
                    <v-icon class="mr-1">mdi-alert-circle</v-icon>
                    <strong> {{ errorObj.message }}</strong>
                  </v-list-item-title>
                  <v-list-item-subtitle class="ml-9">
                    Please try again
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-overlay>
          <!--  EOF Global Overlay Error Message -->

          <!--  Snackbar Notifications -->
          <v-snackbar v-model="snackbar" color="green darken-3">
            {{ message }}

            <template #action="{ attrs }">
              <v-btn
                color="green accent-1"
                text
                v-bind="attrs"
                @click="snackbar = false"
              >
                Close
              </v-btn>
            </template>
          </v-snackbar>
          <!-- EOF Snackbar Notifications -->

          <Nuxt />
        </v-container>
      </v-main>
      <Footer />
    </v-sheet>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Header from '~/components/layout/Header'
import Footer from '~/components/layout/Footer'

export default {
  components: { Header, Footer },
  data: () => ({
    snackbar: false,
    message: `Success`,
    errorObj: { message: '', status: '' },
  }),
  computed: {
    ...mapGetters([
      'getError',
      'showErrorMessage',
      'showSuccessMessage',
      'successMessage',
    ]),
  },
  watch: {
    showSuccessMessage(show) {
      this.snackbar = show
    },
    successMessage(message) {
      this.message = message
    },
    getError(error) {
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.status &&
        error.response.data.message
      ) {
        this.errorObj.status = error.response.data.status
        this.errorObj.message = error.response.data.message
      } else {
        this.errorObj.status = undefined
        this.errorObj.message = undefined
      }
    },
  },
  created() {
    this.$store.commit('SET_ERROR', null)
    this.$store.commit('SET_SHOW_ERROR_MESSAGE', false)
  },
}
</script>

<style lang="scss" scoped>
main {
  padding-bottom: 5em;
}

.test {
  background: #121212;
}
</style>
