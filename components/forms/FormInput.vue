<template>
  <div class="float-label">
    <input
      :id="id"
      :type="type"
      :aria-label="label"
      :placeholder="placeholder || label"
      autocomplete="off"
      :value="value"
      @input="handleInput"
    />
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
    type: {
      type: String,
      default: 'text',
      validator: (val) => ['text', 'password', 'email'].includes(val),
    },
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
      default: undefined,
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
