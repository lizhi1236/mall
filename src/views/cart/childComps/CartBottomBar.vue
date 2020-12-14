<template>
<div class="bottom-bar">
  <div class="bottom-check">
    <CheckButton class="check-button"
                 :is-checked="isAllSelect" @click.native="checkClick" ></CheckButton>
    <span>全选</span>
  </div>
  <div class="total-price">
    合计:
    <span> {{totalPrice}} </span>
  </div>
  <div class="count-to" @click="calcClick">
    去计算({{checkLength}})
  </div>
</div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import {mapGetters} from "vuex"
export default {
name: "CartBottomBar",
  components:{
  CheckButton
  },
  computed:{
    ...mapGetters(['cartList']),
  totalPrice(){
    return "¥" + this.cartList.filter((item)=>{
      return item.checked
    }).reduce((preValue,item)=>{
      return preValue + item.price*item.count
    },0).toFixed(2)
  },
    checkLength(){
    return this.cartList.filter((item)=>{
      return item.checked
    }).length
    },
    isAllSelect(){
    if(this.cartList.length === 0)return false
    return !this.cartList.find(item=>!item.checked)
    }
  },
  methods:{
  checkClick(){
    if(this.isAllSelect){//全部选中
      this.cartList.forEach(item=>item.checked=false)
    }else{//部分或全部不选中
      this.cartList.forEach(item=>item.checked=true)
    }
  },
  calcClick(){
    if(!this.cartList.find(item=>item.checked)){
      this.$toast.show('请选择购买的商品',2000)
    }
  }
  }
}
</script>

<style scoped>
.bottom-bar{
  height: 32px;
  background-color: #eeeeee;
  position: relative;
  bottom: 32px;
  line-height: 32px;
  display: flex;
  font-size: 14px;
}
.bottom-check{
  display: flex;
  align-items: center;
  width: 100px;
}
.check-button{
  width: 18px;
  height: 18px;
  line-height: 18px;
  margin-left: 6px;
  margin-right: 6px;
}
.total-price{
  margin-left: 2px;
  flex: 1;
}
.count-to{
  width: 80px;
  text-align: center;
  color: white;
  margin-right: 0;
  background-color: #ff5f3e;
}
</style>
