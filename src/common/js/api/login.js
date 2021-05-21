const state = {
  token: 0,
  userInfo: {}
}

const mutations = {
  setLogin(state, code) {
    state.token = code
  },
  setUserInfo(state, data) {
    state.userInfo = JSON.parse(data)
    // console.log(state.userInfo)
  }
}

export default {
  state,
  mutations
}