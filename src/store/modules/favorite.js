// initial state
const state = () => ({
  items: [],
});

// getters
const getters = {
  favoriteProducts: (state, getters, rootState) => {
    return state.items.map((id) => {
      const product = rootState.products.all.find(
        (product) => product.id === id
      );

      return product;
    });
  },

  favoriteProductsCount: (state, getters) => {
    return getters.favoriteProducts.length;
  },

  isFavoriteProduct: (state) => (id) => {
    return state.items.some((product) => product === id);
  },
};

// actions
const actions = {
  toggleFavoriteProduct({ state, commit }, product) {
    const favoriteItem = state.items.find((item) => item === product.id);

    if (!favoriteItem) {
      commit("pushProductToFavorite", { id: product.id });
    } else {
      commit("removeProductFromFavorite", { id: product.id });
    }
  },
};

// mutations
const mutations = {
  pushProductToFavorite(state, { id }) {
    state.items.push(id);
  },

  removeProductFromFavorite(state, { id }) {
    const index = state.items.findIndex((item) => item === id);

    if (~index) {
      state.items.splice(index, 1);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
