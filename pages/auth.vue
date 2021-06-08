<template>
  <v-container fill-height="fill-height">
    <v-layout align-center justify-center>
      <v-flex class="login-form text-center">
        <v-card dark>
          <v-card-text>
            <div class="d-flex justify-center">
              <v-img max-height="80" max-width="80" src="/moov.png"></v-img>
            </div>
            <div class="subheading">
              Log in and start to manage your moooovies!
            </div>
            <v-form class="">
              <v-text-field
                v-if="!options.isLoggingIn"
                v-model="user.name"
                prepend-icon="person"
                label="Name"
              ></v-text-field>
              <v-text-field
                v-model="user.email"
                prepend-icon="mdi-email"
                label="Email"
                type="email"
              ></v-text-field>
              <v-text-field
                v-model="user.password"
                prepend-icon="mdi-lock"
                label="Password"
                type="password"
              ></v-text-field>
              <v-btn
                v-if="options.isLoggingIn"
                color="primary"
                block="block"
                type="submit"
                @click.prevent=""
                >Sign in</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
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
