<template>
  <fieldset>
    <legend v-if="legend">{{ legend }}</legend>

    <slot></slot>

    <div class="actions">
      <slot name="actions"></slot>
    </div>
  </fieldset>
</template>

<script>
export default {
  props: {
    legend: {
      type: String,
      required: false,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
fieldset {
  margin: 0 auto;
  max-width: 50vw;

  .actions {
    float: right;
  }
}

legend {
  font-size: 24px;
  font-weight: 300;
}
</style>
