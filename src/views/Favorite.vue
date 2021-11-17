<template>
  <div class="favorite">
    <grid-page title="Избранное">
      <product-list v-if="productsCount > 0" :products="products" />
      <zero-state
        v-else
        label="Список избранного пуст."
        :link="{ text: 'Перейдите в каталог товаров.', to: { name: 'Home' } }"
      />
    </grid-page>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Favorite",
  components: {
    ProductList: () =>
      import(
        /* webpackChunkName: "product-list" */ "@/components/ProductList.vue"
      ),
    ZeroState: () =>
      import(/* webpackChunkName: "zero-state" */ "@/components/ZeroState.vue"),
    GridPage: () =>
      import(
        /* webpackChunkName: "grid-page" */ "@/components/Grids/GridPage.vue"
      ),
  },
  computed: {
    ...mapGetters({
      products: "favorite/favoriteProducts",
      productsCount: "favorite/favoriteProductsCount",
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "@/css/variables/units";
@import "@/css/variables/typography";

.favorite {
  .product-list-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: $default-column-gap;
    row-gap: $default-row-gap;

    // TODO: можно вынести в единый _grid.scss
    @media screen and (max-width: 1024px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media screen and (max-width: 620px) {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
  }
}
</style>
