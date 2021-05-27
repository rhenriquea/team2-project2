<template>
  <div>
    <h1>Create</h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="avatar"
        label="Avatar Image"
        required
      ></v-text-field>

      <v-text-field
        v-model="first_name"
        :counter="10"
        :rules="nameRules"
        label="First Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="last_name"
        :counter="10"
        :rules="nameRules"
        label="Last Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-select
        v-model="job_title"
        :items="items"
        :rules="[(v) => !!v || 'Item is required']"
        label="Item"
        required
      ></v-select>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="submit">
        Submit
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>

      <v-btn color="warning" @click="resetValidation"> Reset Validation </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    avatar: '',
    first_name: '',
    last_name: '',
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    job_title: null,
    items: [
      'Account Coordinator',
      'Accountant I',
      'Accounting Assistant IV',
      'Actuary',
      'Administrative Officer',
      'Editor',
      'Electrical Engineer',
      'GIS Technical Architect',
      'GIS Technical Architect',
      'Information Systems Manager',
      'Librarian',
      'Programmer IV',
      'Programmer IV',
      'Recruiting Manager',
      'Research Nurse',
      'Staff Accountant III',
      'Structural Engineer',
      'Technical Writer',
      'VP Marketing',
      'VP Quality Control',
    ],
  }),

  async fetch() {
    const { data } = await this.$axios.$get('/app/users')
    this.person = data.find((p) => p.id.toString() === this.$route.params.id)
  },

  methods: {
    submit() {
      this.$refs.form.validate()

      const createdPerson = {
        avatar: this.avatar,
        first_name: this.first_name,
        last_name: this.last_name,
        job_title: this.job_title,
        email: this.email,
      }

      console.log(createdPerson)
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
