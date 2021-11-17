<template>
  <div class="product-list-grid">
    <product-list-item
      v-for="(product, index) in products"
      :key="`${product.id}_${index}`"
      :product="product"
      :quantity-product-in-cart="quantityProductInCart(product.id)"
      :in-cart="inCart"
      :is-favorite="isFavoriteProduct(product.id)"
      @process-cart="processCart"
      @toggle-favorite="toggleFavoriteProduct"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ProductListItem from "@/components/ProductListItem.vue";
import {
  CART_OPERATION_DECREMENT,
  CART_OPERATION_INCREMENT,
  CART_OPERATION_REMOVE,
} from "@/constants/index";

export default {
  name: "ProductList",
  components: { ProductListItem },
  props: {
    products: {
      type: Array,
      required: true,
    },
    inCart: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      quantityProductInCart: "cart/quantityProductInCart",
      isFavoriteProduct: "favorite/isFavoriteProduct",
    }),
  },
  methods: {
    ...mapActions({
      addProductToCart: "cart/addProductToCart",
      removeProductFromCart: "cart/removeProductFromCart",
      toggleFavoriteProduct: "favorite/toggleFavoriteProduct",
    }),
    processCart({ operation, product }) {
      switch (operation) {
        case CART_OPERATION_DECREMENT:
          this.removeProductFromCart({ product });
          break;

        case CART_OPERATION_INCREMENT:
          this.addProductToCart(product);
          break;

        case CART_OPERATION_REMOVE:
          this.removeProductFromCart({ product, force: true });
          break;

        default:
          break;
      }
    },
  },
};
</script>
