<template>
  <div class="cart">
    <NavBar class="cart-nav">
      <div slot="center">
        购物车({{length}})
      </div>
    </NavBar>
    <CartList></CartList>
    <CartBottomBar></CartBottomBar>
  </div>

</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import CartList from "./childComps/CartList"
import CartBottomBar from "./childComps/CartBottomBar"

import { mapGetters } from "vuex"
export default {
  name: "Cart",
  components:{
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    //两种语法
    //1.数组语法
    //...mapGetters(['cartLength'])
    //2.对象语法
    ...mapGetters({
      length:'cartLength'
    })

  }
}
</script>

<style scoped>
.cart{
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.cart-nav{
  background-color: var(--color-tint);
  color: white;
}
</style>
