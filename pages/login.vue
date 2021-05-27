<template>
  <v-container fill-height="fill-height">
    <v-layout align-center="align-center" justify-center="justify-center">
      <v-flex class="login-form text-xs-center">
        <div class="display-1 mb-3">Login</div>
        <v-card light="light">
          <v-card-text>
            <div class="subheading">
              <template v-if="options.isLoggingIn"
                >Log in to your customer portal</template
              >
              <template v-else>Crate a new account</template>
            </div>
            <v-form>
              <v-text-field
                v-if="!options.isLoggingIn"
                v-model="user.name"
                light="light"
                prepend-icon="person"
                label="Name"
              ></v-text-field>
              <v-text-field
                v-model="user.email"
                light="light"
                prepend-icon="mdi-email"
                label="Email"
                type="email"
              ></v-text-field>
              <v-text-field
                v-model="user.password"
                light="light"
                prepend-icon="mdi-lock"
                label="Password"
                type="password"
              ></v-text-field>
              <v-checkbox
                v-if="options.isLoggingIn"
                v-model="options.shouldStayLoggedIn"
                light="light"
                label="Stay logged in?"
                hide-details="hide-details"
              ></v-checkbox>
              <v-btn
                v-if="options.isLoggingIn"
                block="block"
                type="submit"
                @click.prevent=""
                >Sign in</v-btn
              >
              <v-btn
                v-else
                block="block"
                type="submit"
                @click.prevent="options.isLoggingIn = true"
                >Sign up</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
        <div
          v-if="options.isLoggingIn"
          class="mt-3 d-flex align-center justify-center"
        >
          Don't have an account?
          <v-btn text color="primary" @click="options.isLoggingIn = false"
            >Sign up</v-btn
          >
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    user: {
      // email: 'admin@example.com',
      // password: 'admin',
      // name: 'John Doe',
    },
    options: {
      isLoggingIn: true,
      shouldStayLoggedIn: true,
    },
  }),
}
</script>

<style lang="scss" scoped>
.login-form {
  max-width: 500px;
}
</style>
