<template>
  <div class="zero-state">
    <p>
      {{ label }}
      <router-link v-if="link" :to="link.to">{{ link.text }}</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: "ZeroState",
  props: {
    label: {
      type: String,
      required: false,
      default: "",
    },
    link: {
      type: Object,
      required: false,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
$color-price: #000000;

.zero-state {
  flex: 1;
  text-align: center;
  padding: 50px 0;
  font-size: 30px;

  a {
    color: $color-price;
  }
}
</style>
