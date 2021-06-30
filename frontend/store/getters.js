export default {
  getJWTToken: (state) => state.jwt || '',
  isAuthenticated: (state) => state.jwt && state.jwt.includes('Bearer'),
  showErrorMessage: (state) => state.showErrorMessage || false,
  showSuccessMessage: (state) => state.showSuccessMessage || false,
  successMessage: (state) => state.successMessage || 'Success',
  getError: (state) => state.error || null,
}
