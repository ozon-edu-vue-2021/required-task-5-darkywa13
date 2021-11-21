<template>
  <div
    :class="[
      'product-item',
      {
        'product-item_in-cart': inCart,
        'product-item_is-favorite': isFavorite,
      },
    ]"
  >
    <div class="product-item__top-actions">
      <button
        class="top-action top-action_favorite"
        type="button"
        @click="$emit('toggle-favorite', product)"
      >
        <span class="icon material-icons-outlined"> favorite </span>
      </button>
    </div>

    <div class="product-item__media">
      <!-- здесь можно было бы реализовать тег picture и lazy-load -->
      <img :src="getImagePath" :alt="product.dish" />
    </div>

    <div class="product-item__price">
      {{ product.price | currency }}
    </div>

    <div class="product-item__content">
      <div class="product-item__title">
        {{ product.dish }}
      </div>

      <div class="product-item__description">
        {{ product.description }}
      </div>
    </div>

    <div class="product-item__bottom-actions">
      <button
        v-if="!inCart"
        class="add-to-cart"
        @click="$emit('process-cart', { operation: 'increment', product })"
      >
        <span class="icon material-icons-outlined">
          {{ productInCart ? "check" : "shopping_cart" }}
        </span>
        В корзину
      </button>

      <count-selector
        v-if="productInCart"
        :count="quantityProductInCart"
        @change="changeQty"
      />
      <button
        v-if="inCart"
        class="remove-from-cart"
        @click="$emit('process-cart', { operation: 'remove', product })"
      >
        Удалить
      </button>
    </div>
  </div>
</template>

<script>
import CountSelector from "@/components/CountSelector.vue";

export default {
  name: "ProductListItem",
  components: { CountSelector },
  props: {
    product: {
      type: Object,
      required: true,
    },
    quantityProductInCart: {
      type: Number,
      required: false,
      default: 0,
    },
    inCart: {
      type: Boolean,
      required: false,
      default: false,
    },
    isFavorite: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    productInCart() {
      return this.quantityProductInCart > 0;
    },
    getImagePath() {
      return require(`@/assets/images/${this.product.image}`);
    },
  },
  methods: {
    changeQty(operation) {
      this.$emit("process-cart", { operation, product: this.product });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/css/components/_product-list-item";
</style>
