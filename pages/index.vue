<template>
  <div>
    <v-row align="center">
      <v-btn to="/person/create">Add Employer</v-btn>
    </v-row>
    <v-row justify="center" align="center">
      <v-col v-for="person in people" :key="person.id" cols="12" sm="8" md="4">
        <v-card class="mx-auto" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">{{ person.email }}</div>

              <nuxt-link :to="'/person/' + person.id">
                <v-list-item-title class="headline mb-1">
                  {{ person.first_name }} {{ person.last_name }}
                </v-list-item-title>
              </nuxt-link>
              <v-list-item-subtitle>{{
                person.job_title
              }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar tile size="80" rounded color="white">
              <img alt="Avatar" :src="person.avatar" />
            </v-list-item-avatar>
          </v-list-item>

          <v-card-actions class="d-flex justify-end">
            <v-tooltip top>
              <template #activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  class="mr-2"
                  v-bind="attrs"
                  outlined
                  rounded
                  icon
                  :to="'/person/' + person.id + '/edit'"
                  v-on="on"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <span>Edit</span>
            </v-tooltip>

            <v-tooltip top>
              <template #activator="{ on, attrs }">
                <v-btn
                  color="red"
                  v-bind="attrs"
                  outlined
                  rounded
                  icon
                  :to="'/person/' + person.id + '/delete'"
                  v-on="on"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>Delete</span>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      people: [],
    }
  },

  async fetch() {
    const { data } = await this.$axios.$get('/app/users')
    this.people = data
  },

  activated() {
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch()
    }
  },
}
</script>
