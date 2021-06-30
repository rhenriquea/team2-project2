<template>
  <div class="float-label">
    <textarea
      :id="id"
      :aria-label="label"
      :placeholder="label"
      autocomplete="off"
      :value="value"
      @input="handleInput"
    ></textarea>
    <label :for="id">{{ label }}</label>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
  },
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value)
    },
  },
}
</script>
