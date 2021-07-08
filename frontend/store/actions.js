export default {
  setJWTToken({ commit }, { token }) {
    commit('SET_JWT_TOKEN', { token })
  },
  setUser({ commit }, { user }) {
    commit('SET_USER', { user })
  },
  showErrorMessage({ commit }, error) {
    commit('SET_SHOW_ERROR_MESSAGE', true)
    commit('SET_ERROR', error)

    /* setTimeout(() => {
      commit('SET_SHOW_ERROR_MESSAGE', false)
      commit('SET_ERROR', null)
    }, 5000) */
  },
  showSuccessMessage({ commit }, message) {
    commit('SET_SHOW_SUCCESS_MESSAGE', true)
    commit('SET_MESSAGE', message)

    setTimeout(() => {
      commit('SET_SHOW_SUCCESS_MESSAGE', false)
      commit('SET_MESSAGE', '')
    }, 5000)
  },
}
