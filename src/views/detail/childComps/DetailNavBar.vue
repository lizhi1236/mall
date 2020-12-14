<template>
  <NavBar>
    <div slot="left" class="back" @click="goBack"><img src="~assets/img/common/back.svg"></div>
    <div slot="center" class="title">
     <div v-for="(item,index) in navItem"
          class="title-item"
          :class="{active:index===currentIndex}"
          @click="clickItem(index)">{{item}}</div>
    </div>
  </NavBar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name: "DetailNavBar",
  components:{
    NavBar
  },
  data(){
    return{
      navItem:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  methods:{
    clickItem(index){
      this.currentIndex=index
      this.$emit('itemClick',index)
    },
    goBack(){
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.title{
  display: flex;
}
.title-item{
  flex:1;
  font-size: 13px;
}
.active{
  color: var(--color-high-text);
}
.back img{
  margin-top: 12px;
}
</style>
