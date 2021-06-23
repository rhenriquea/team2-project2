export default function ({ store, $axios, redirect }) {
  $axios.onRequest((config) => {
    $axios.setHeader('Authorization', store.getters.getJWTToken)
  })

  $axios.onError((error) => {
    if (error.response && error.response.data) {
      const { status, message } = error.response.data

      if (status === 500 && message === 'INVALID_TOKEN') {
        store.dispatch('showErrorMessage', error)
        store.dispatch('setJWTToken', { token: null })
        redirect('/auth')
      }
    }
  })

  $axios.onError((config) => {
    if (config.response && config.response.data) {
      const { status, message } = config.response.data

      if (status === 500 && message === 'INVALID_TOKEN') {
        store.dispatch('setJWTToken', { token: null })
        redirect('/auth')
      }
    }
  })
}
