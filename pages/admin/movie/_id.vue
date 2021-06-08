<template>
  <movie-form />
</template>

<script>
import MovieForm from '~/components/MovieForm'

export default {
  components: {
    MovieForm,
  },
  data: () => ({
    person: null,
    valid: true,
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
    const { data } = await this.$axios.$get('/api/v1/movies')
    this.person = data.find((p) => p.id.toString() === this.$route.params.id)
    this.first_name = this.person.first_name
    this.last_name = this.person.last_name
    this.job_title = this.person.job_title
    this.email = this.person.email
  },

  methods: {
    submit() {
      this.$refs.form.validate()

      const updatedPerson = {
        id: this.person.id,
        first_name: this.first_name,
        last_name: this.last_name,
        job_title: this.job_title,
        email: this.email,
      }

      console.log(updatedPerson)
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
