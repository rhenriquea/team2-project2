<template>
  <FormFieldset :legend="legend">
    <FormInput
      id="title"
      v-model="title"
      type="text"
      :value="title"
      label="Title"
    />
    <FormTextarea
      id="description"
      v-model="description"
      :value="description"
      label="Description"
    />

    <template #actions>
      <CustomButton type="submit" label="Submit" />
    </template>
  </FormFieldset>
</template>

<script>
import FormTextarea from '~/components/forms/FormTextarea'
import CustomButton from '~/components/forms/CustomButton'
import FormInput from '~/components/forms/FormInput'
import FormFieldset from '~/components/layout/FormFieldset'

export default {
  components: {
    FormInput,
    FormFieldset,
    FormTextarea,
    CustomButton,
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    movie: undefined,
  },
  data: () => ({
    title: '',
    description: '',
  }),
  computed: {
    legend() {
      return this.isEdit ? 'Edit Movie' : 'Create Movie'
    },
  },
  mounted() {
    if (this.isEdit) {
      this.title = this.movie.title
      this.description = this.movie.description
    }
  },
}
</script>

<style lang="scss" scoped></style>
