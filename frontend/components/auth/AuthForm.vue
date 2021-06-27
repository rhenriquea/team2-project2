<template>
  <v-row justify="center" class="mt-12 mb-5">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card ref="form" outlined>
        <v-card-title class="display-1">
          <strong>{{ isLogin ? 'Login' : 'Signup' }}</strong>
        </v-card-title>
        <v-card-subtitle v-if="isLogin">Enter your credentials</v-card-subtitle>

        <v-divider></v-divider>

        <v-card-text>
          <p v-if="!isLogin">
            <span>Name:</span>
            <v-text-field ref="name" v-model="name" required></v-text-field>
          </p>
          <p>
            <span>Email:</span>
            <v-text-field ref="email" v-model="email" required></v-text-field>
          </p>
          <p>
            <span>Password:</span>
            <v-text-field
              ref="password"
              v-model="password"
              type="password"
              required
            ></v-text-field>
          </p>
        </v-card-text>
        <v-divider class="mt-5"></v-divider>
        <v-card-actions>
          <v-btn color="primary" @click.prevent="submit">
            {{ isLogin ? 'Login' : 'Signup' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    isLogin: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    email: null,
    password: null,
    name: null,
  }),
  methods: {
    submit() {
      const { email, password, name } = this
      const payload = { email, password }

      if (!this.isLogin) {
        payload.name = name
      }

      this.$emit('submit', payload)
    },
  },
}
</script>
