<template>
  <div class="home">
    <grid-page title="Главная">
      <div v-if="loading" class="home__loading">Загрузка каталога...</div>
      <product-list v-else :products="products" />
    </grid-page>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    ProductList: () =>
      import(
        /* webpackChunkName: "product-list" */ "@/components/ProductList.vue"
      ),
    GridPage: () =>
      import(
        /* webpackChunkName: "grid-page" */ "@/components/Grids/GridPage.vue"
      ),
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState({
      products: (state) => state.products.all,
    }),
  },
  methods: {
    ...mapActions({
      getAllProducts: "products/getAllProducts",
    }),
  },
  async created() {
    if (this.products.length === 0) {
      this.loading = true;
      await this.getAllProducts();
      this.loading = false;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/css/variables/units";
@import "@/css/variables/typography";

.home {
  .product-list-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    column-gap: $default-column-gap;
    row-gap: $default-row-gap;

    // TODO: можно вынести в единый _grid.scss
    @media screen and (max-width: 1220px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @media screen and (max-width: 1024px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media screen and (max-width: 620px) {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
  }

  &__loading {
    padding: 50px;
    text-align: center;
    font-size: $font-size-title;
  }
}
</style>
