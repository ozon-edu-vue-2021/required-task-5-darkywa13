<template>
  <div class="count-selector">
    <button class="count-selector__action" type="button" @click="decrement">
      <span class="icon material-icons"> remove </span>
    </button>
    <span class="count-selector__label">{{ countLabel }}</span>
    <button class="count-selector__action" type="button" @click="increment">
      <span class="icon material-icons"> add </span>
    </button>
  </div>
</template>

<script>
import {
  CART_OPERATION_DECREMENT,
  CART_OPERATION_INCREMENT,
} from "@/constants/index";

export default {
  name: "CountSelector",
  props: {
    count: {
      type: [String, Number],
      required: false,
      default: 0,
    },
  },
  computed: {
    countLabel() {
      return this.count < 100 ? this.count : "99+";
    },
  },
  methods: {
    decrement() {
      this.$emit("change", CART_OPERATION_DECREMENT);
    },
    increment() {
      this.$emit("change", CART_OPERATION_INCREMENT);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/css/variables/colors";
@import "@/css/variables/typography";

.count-selector {
  display: flex;
  align-items: center;

  &__action {
    background-color: $color-white;
    border: none;
    display: flex;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    padding: 0;
    border: 1px solid $color-grey;

    &:hover {
      cursor: pointer;
      color: $color-red-light;
    }

    .icon {
      font-size: $font-size-text;
      margin: auto;
    }
  }

  &__label {
    margin: 0 5px;
    font-weight: bold;
    width: 25px;
    text-align: center;
  }
}
</style>
