const Home = () =>
  import(/* webpackChunkName: "home-view" */ "@/views/Home.vue");
const Cart = () =>
  import(/* webpackChunkName: "cart-view" */ "@/views/Cart.vue");
const Favorite = () =>
  import(/* webpackChunkName: "favorite-view" */ "@/views/Favorite.vue");

const routes = [
  { name: "Home", path: "/", component: Home },
  { name: "Cart", path: "/cart", component: Cart },
  { name: "Favorite", path: "/favorite", component: Favorite },
];

export default routes;
