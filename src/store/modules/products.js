import images from "../../assets/data/images-name.json";

const PRODUCTS_ENDPOINT =
  "https://random-data-api.com/api/food/random_food?size=30";

function prepareProducts(raw) {
  return raw.map((p) => {
    const imgIndex = +(Math.random() * (images.length - 1)).toFixed();

    return {
      ...p,
      price: +(Math.random() * 10000).toFixed(2),
      image: images[imgIndex],
    };
  });
}

// initial state
const state = () => ({
  all: [],
});

// getters
const getters = {};

// actions
const actions = {
  getAllProducts({ commit }) {
    return fetch(PRODUCTS_ENDPOINT)
      .then((response) => response.json())
      .then((data) => {
        let products = [];

        if (Array.isArray(data)) {
          products = prepareProducts(data);
        }

        return products;
      })
      .then((data) => {
        commit("setProducts", data);
      })
      .catch(console.error);
  },
};

// mutations
const mutations = {
  setProducts(state, products) {
    state.all = products;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
