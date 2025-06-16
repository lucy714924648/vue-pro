export default {
    namespace: true,
    state: {
        pageNames: []
    },
    mutations: {
        addPage(state, newValue) {
            if (!state.pageNames.includes(newValue)) {
                state.pageNames.push(newValue)
            }
        },
        removePage(state, pageName) {
            const index = state.pageNames.indexOf(pageName);
            if (index >= 0) {
                state.pageNames.splice(index, 1);
            }
        }
    }
}