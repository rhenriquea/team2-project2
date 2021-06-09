<template>
  <FormFieldset legend="Login">
    <FormInput
      id="email"
      v-model="email"
      type="email"
      label="Email"
      placeholder="example@email.com"
    />
    <FormInput
      id="password"
      v-model="password"
      type="password"
      label="Password"
    />

    <template #actions>
      <CustomButton type="submit" label="Submit" />
    </template>
  </FormFieldset>
</template>

<script>
import CustomButton from '~/components/forms/CustomButton'
import FormInput from '~/components/forms/FormInput'
import FormFieldset from '~/components/layout/FormFieldset'

export default {
  components: {
    FormInput,
    FormFieldset,
    CustomButton,
  },
}
</script>
