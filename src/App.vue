<template>
  <div id="app">
    <header class="header">
      <nav class="menu">
        <ul>
          <li v-for="item in menuItems" :key="item.id" class="menu-item">
            <router-link :to="item.route" class="menu-item__link">{{
              item.name
            }}</router-link>
          </li>
        </ul>
      </nav>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      menuItems: [
        { id: "home", name: "Главная", route: { name: "Home" } },
        { id: "cart", name: "Корзина", route: { name: "Cart" } },
        { id: "favorite", name: "Избранное", route: { name: "Favorite" } },
      ],
    };
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  background-color: #fafafa;
  padding: 24px;
  box-sizing: border-box;
}

#app {
  min-height: 100vh;
}

* {
  box-sizing: border-box;
}

button:focus {
  outline: none;
}

.header {
  margin-bottom: 30px;
}
</style>

<style lang="scss" scoped>
.menu {
  ul {
    list-style: none;
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
    column-gap: 20px;
    row-gap: 20px;
  }
}

.menu-item {
  &__link {
    font-size: 16px;
    color: #444444;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }

    &.router-link-exact-active {
      color: #da2a2a;
    }
  }
}
</style>
