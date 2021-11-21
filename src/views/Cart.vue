<template>
  <div class="cart">
    <grid-page title="Корзина" :display-cart="false">
      <div v-if="productsCount > 0" class="cart__inner">
        <div class="cart__products">
          <product-list :products="products" in-cart />
        </div>
        <div class="cart__checkout checkout">
          <div class="checkout__purchase">
            <button
              class="checkout__purchase-button"
              type="button"
              @click="checkout"
            >
              Перейти к оформлению
            </button>
            <p class="checkout__purchase-info">
              Доступные способы и время доставки можно выбирать при оформлении
              заказа
            </p>
          </div>

          <div class="checkout__divider" />

          <div class="checkout__meta">
            <div class="checkout__meta-title">Ваша корзина</div>
            <div class="checkout__meta-content">
              <div class="checkout__meta-qty">Товары ({{ productsCount }})</div>
              <div class="checkout__meta-qty-total">{{ total | currency }}</div>
            </div>
          </div>

          <div class="checkout__divider" />

          <div class="checkout__total">
            <div class="checkout__total-title">Общая стоимость</div>
            <div class="checkout__total-price">{{ total | currency }}</div>
          </div>
        </div>
      </div>
      <zero-state
        v-else
        label="Ваша корзина пуста."
        :link="{ text: 'Перейдите в каталог товаров.', to: { name: 'Home' } }"
      />
    </grid-page>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Cart",
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
    ...mapGetters("cart", {
      products: "cartProducts",
      total: "cartTotalPrice",
      productsCount: "productsCount",
      quantityProductInCart: "quantityProductInCart",
    }),
  },
  methods: {
    checkout() {
      const alert = this.products.reduce((p, product) => {
        return (
          p + `${product.dish}: ${this.quantityProductInCart(product.id)}\n`
        );
      }, "");

      window.alert(alert);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/css/variables/colors";
@import "@/css/variables/units";
@import "@/css/variables/typography";

.cart {
  &__inner {
    display: flex;
    align-items: flex-start;

    @media screen and (max-width: 900px) {
      flex-direction: column;
    }
  }

  &__products {
    flex: 1;

    &::v-deep .product-item:not(:last-child) {
      margin-bottom: $default-vertical-margin;
    }
  }

  &__checkout {
    width: 300px;
    margin-left: $default-vertical-margin;
    padding: 20px;
    border: 1px solid $color-grey-light;
    border-radius: $default-border-radius;

    @media screen and (max-width: 900px) {
      .cart__checkout {
        width: 100%;
        margin-left: 0;
        margin-top: $default-vertical-margin;
      }
    }
  }

  @media screen and (max-width: 900px) {
    flex-direction: column;

    .cart__checkout {
      width: 100%;
      margin-left: 0;
      margin-top: $default-vertical-margin;
    }
  }
}

.checkout {
  &__divider {
    width: 100%;
    height: 2px;
    background-color: $color-grey;
    margin: $default-vertical-margin 0;
  }

  &__purchase {
    &-button {
      height: 40px;
      padding: 0 20px;
      background-color: $color-green-light;
      color: $color-white;
      border: none;
      border-radius: $default-border-radius;
      width: 100%;

      &:hover {
        background-color: $color-green;
        cursor: pointer;
      }

      &:active {
        background-color: $color-green-dark;
      }
    }

    &-info {
      margin: 10px 0 0;
      color: $color-grey;
      font-size: $font-size-text2;
    }
  }

  &__meta {
    margin-top: $default-vertical-margin;

    &-title {
      font-size: $font-size-header2;
      color: $color-dark;
      font-weight: bold;
    }

    &-content {
      margin-top: $default-vertical-margin-md;
      display: flex;
      justify-content: space-between;
    }

    &-qty {
      font-size: $font-size-text2;
      color: $color-black;
    }

    &-qty-total {
      font-size: $font-size-text2;
      color: $color-black;
      font-weight: bold;
    }
  }

  &__total {
    margin-top: $default-vertical-margin;
    display: flex;
    justify-content: space-between;
    font-size: $font-size-header;
    color: $color-dark;
    font-weight: bold;
  }
}
</style>
