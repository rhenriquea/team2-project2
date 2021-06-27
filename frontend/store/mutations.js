export default {
  SET_JWT_TOKEN(state, { token }) {
    const jwtToken = token ? `Bearer ${token}` : ''
    state.jwt = jwtToken
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  SET_SHOW_ERROR_MESSAGE(state, show) {
    state.showErrorMessage = show
  },
  SET_MESSAGE(state, message) {
    state.successMessage = message
  },
  SET_SHOW_SUCCESS_MESSAGE(state, show) {
    state.showSuccessMessage = show
  },
}
