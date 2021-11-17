<template>
  <router-link :to="{ name: 'Cart' }" class="cart-link">
    <span class="icon material-icons-outlined"> shopping_cart </span>
    Корзина ({{ productsCount }}) на сумму {{ cartTotalPrice | currency }}
  </router-link>
</template>

<script>
export default {
  name: "CartLink",
  computed: {
    productsCount() {
      return this.$store.getters["cart/productsCount"];
    },
    cartTotalPrice() {
      return this.$store.getters["cart/cartTotalPrice"];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/css/variables/colors";
@import "@/css/variables/typography";

.cart-link {
  display: flex;
  align-items: center;
  color: $color-dark;
  text-decoration: none;
  font-size: $font-size-text;

  &:hover {
    text-decoration: underline;
  }

  .icon {
    font-size: $font-size-text;
    margin-right: 5px;
  }
}
</style>
