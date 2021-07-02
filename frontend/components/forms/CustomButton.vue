<template>
  <button :type="type">{{ label }}</button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: 'Label',
      required: true,
    },
    type: {
      type: String,
      default: 'button',
      validator: (val) => ['button', 'submit'].includes(val),
    },
  },
}
</script>

<style lang="scss" scoped>
button {
  background: transparent;
  border: 1px solid $white;
  color: $white;
}
</style>
