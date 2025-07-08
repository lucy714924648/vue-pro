const state = {
  pageName: []
}

const mutations = {
  addPage(state, pageName) {
    if (!state.pageName.includes(pageName)) {
      state.pageName.push(pageName)
    }
  },
  removePage(state, pageName) {
    const idx = state.pageName.indexOf(pageName)
    if (idx !== -1) {
      state.pageName.splice(idx, 1)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations
}