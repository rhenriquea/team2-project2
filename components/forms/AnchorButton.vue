<template>
  <NuxtLink :to="to" class="d-flex">
    <i v-if="icon" class="material-icons"> {{ icon }}</i> {{ label }}
  </NuxtLink>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
      default: 'Label',
    },
    icon: {
      type: String,
      required: false,
      default: undefined,
    },
  },
}
</script>

<style lang="scss" scoped>
a {
  border: 1px solid;
  border-radius: 0.25em;
  color: $white;
  display: inline-flex;
  margin-right: 15px;
  min-width: 80px;
  padding: 10px;
  text-align: center;
  text-decoration: none;

  i {
    margin-right: 5px;
  }
}
</style>
