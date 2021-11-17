// initial state
const state = () => ({
  items: [],
});

// getters
const getters = {
  cartProducts: (state, getters, rootState) => {
    return state.items.map(({ id, quantity }) => {
      const product = rootState.products.all.find(
        (product) => product.id === id
      );
      return {
        ...product,
        quantity,
      };
    });
  },

  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  },

  quantityProductInCart: (state) => (id) => {
    const product = state.items.find((p) => p.id === id);

    return product?.quantity || 0;
  },

  productsCount: (state) => {
    return state.items.length;
  },
};

// actions
const actions = {
  addProductToCart({ state, commit }, product) {
    const cartItem = state.items.find((item) => item.id === product.id);

    if (!cartItem) {
      commit("pushProductToCart", { id: product.id });
    } else {
      commit("incrementItemQuantity", cartItem);
    }
  },

  removeProductFromCart({ state, commit }, { product, force = false }) {
    if (force) {
      commit("removeProductFromCart", { id: product.id });

      return;
    }

    const cartItem = state.items.find((item) => item.id === product.id);

    if (cartItem && cartItem.quantity <= 1) {
      commit("removeProductFromCart", { id: product.id });
    } else {
      commit("decrementItemQuantity", cartItem);
    }
  },
};

// mutations
const mutations = {
  pushProductToCart(state, { id }) {
    state.items.push({
      id,
      quantity: 1,
    });
  },

  removeProductFromCart(state, { id }) {
    const index = state.items.findIndex((item) => item.id === id);

    if (~index) {
      state.items.splice(index, 1);
    }
  },

  incrementItemQuantity(state, { id }) {
    const cartItem = state.items.find((item) => item.id === id);
    cartItem.quantity++;
  },

  decrementItemQuantity(state, { id }) {
    const cartItem = state.items.find((item) => item.id === id);
    cartItem.quantity--;
  },

  setCartItems(state, { items }) {
    state.items = items;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
