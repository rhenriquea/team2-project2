<template>
  <v-card class="mx-auto" tile max-width="344" dark>
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="350px"
    ></v-img>

    <v-card-title> Top western road trips </v-card-title>
    <v-card-subtitle class="py-0"> 1,000 miles of wonder </v-card-subtitle>

    <v-rating
      v-model="rating"
      class="ml-2"
      background-color="pink lighten-3"
      color="pink"
      small
    ></v-rating>

    <v-card-text class="text--white">
      <h4>Summary</h4>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, rem iste
        aspernatur voluptate dolore suscipit labore. Atque labore consequatur
        inventore enim libero expedita a at ex fugit voluptatibus, illum
        commodi?
      </p>
    </v-card-text>

    <v-card-actions>
      <v-btn outlined color="pink lighten-2">
        <v-icon> mdi-play</v-icon> Watch trailer
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
