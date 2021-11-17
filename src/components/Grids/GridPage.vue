<template>
  <div class="grid-page">
    <div v-if="title" class="grid-page__header">
      <h1>{{ title }}</h1>

      <div v-if="displayCart" class="grid-page__cart">
        <cart-link />
      </div>
    </div>

    <div class="grid-page__body">
      <slot />
    </div>
  </div>
</template>

<script>
import CartLink from "@/components/CartLink.vue";

export default {
  name: "GridPage",
  components: { CartLink },
  props: {
    title: {
      type: String,
      required: false,
      default: "",
    },
    displayCart: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/css/variables/colors";
@import "@/css/variables/units";
@import "@/css/variables/typography";

.grid-page {
  width: 1200px;
  max-width: 100%;
  background-color: $color-white;
  padding: 20px 30px;
  margin: 0 auto;
  border-radius: $default-border-radius;

  &__header {
    margin-bottom: $default-vertical-margin-xl;
    display: flex;
    align-items: center;

    h1 {
      flex: 1;
      font-size: $font-size-h1;
      margin: 0;
      color: #444444;
    }
  }

  &__cart {
    margin-left: 20px;
  }
}
</style>
