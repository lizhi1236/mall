<template>
  <div class="cart-list">
    <Scroll class="content" ref="scroll">
      <!--  <li v-for="item in $store.state.cartList">{{item}}</li>  -->
      <CartListItem v-for="(item,index) in cartList" :key="index" :item-info="item">
      </CartListItem>
    </Scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll"
import CartListItem from "./CartListItem"
import {mapGetters} from "vuex"
export default {
  name: "CartList",
  computed:{
    ...mapGetters(['cartList'])
  },
  components:{
    Scroll,
    CartListItem
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.cart-list{
  height: calc(100vh - 44px - 49px);
}
.content{
  height:100%;
  overflow: hidden;
}
</style>
