<template>
<div id="detail">
  <detail-nav-bar class="detail-nav" @itemClick="itemClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommends"></goods-list>
    </scroll>
  <back-top @click.native="backClick" v-show="showBack"></back-top>
  <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
  <toast :message="message"  :show="show"></toast>
</div>
</template>

<script>
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail"


import {itemListenerMixin,backTop} from "common/mixin";

import DetailNavBar from "./childComps/DetailNavBar"
import DetailSwiper from "./childComps/DetailSwiper"
import DetailBaseInfo from "./childComps/DetailBaseInfo"
import DetailShopInfo from "./childComps/DetailShopInfo"
import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
import DetailParamInfo from "./childComps/DetailParamInfo"
import DetailCommentInfo from "./childComps/DetailCommentInfo"
import GoodsList from "components/content/goods/GoodsList"
import DetailBottomBar from "./childComps/DetailBottomBar"
import BackTop from 'components/content/backtop/BackTop'
import Toast from "components/common/toast/Toast";

import Scroll from "components/common/scroll/Scroll"

import {mapActions} from "vuex"

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    BackTop,
    Toast,

    Scroll

  },
  mixins:[itemListenerMixin,backTop],
  data(){
  return{
    iid:null,
    topImages:[],
    goods: {},
    shop:{},
    detailInfo:{},
    paramInfo:{},
    commentInfo:{},
    recommends:[],
    themeTopYs:[],
    currentIndex:0,
    message:'',
    show:false,
  }
  },
  created(){
    //1.保存传入的iid
    this.iid=this.$route.params.iid
    //2.根据iid请求详情数据
    getDetail(this.iid).then(res=>{
      //console.log(res);
      const data=res.result;
      //1.获取顶部的轮播数据图片
      this.topImages=data.itemInfo.topImages
      //2.获取商品信息
      this.goods=new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //3.获取店铺信息
      this.shop=new Shop(data.shopInfo)
      //4.保存商品详情数据
      this.detailInfo=data.detailInfo
      //5.获取商品参数
      this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
      //6.获取评论信息
      if(data.rate.cRate !==0){
        this.commentInfo=data.rate.list[0]
      }
    })
    //7.获取推荐商品
    getRecommend().then(res=>{
      this.recommends=res.data.list
    })
  },
  mounted() {
  },
  destroyed() {
    //取消全局事件的监听
    this.$bus.$off('itemImageLoad',this.itemImgListenner)
  },
  methods:{
    ...mapActions(['addCart']),
    imageLoad(){
      this.$refs.scroll.refresh()
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
      //console.log(this.themeTopYs);
    },
    itemClick(index){
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
    },
    contentScroll(position){
    //1.获取y值
      const positionY=-position.y
    //2.和主题y值进行对比 商品0~1,参数1~2,评论2~3,推荐>3
      let length=this.themeTopYs.length
      for(let i=0; i<length; i++){
        if(this.currentIndex!==i&&((i<length-1&&positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])
          ||(i===length-1&&positionY>=this.themeTopYs[i]))){
          this.currentIndex=i;
          this.$refs.nav.currentIndex=this.currentIndex

        }
      }
      //判断backTop是否显示
      this.showBack=(-position.y)>1000

    },
    addToCart(){
      //获取购物车需要展示的信息
      const product={}
      product.image= this.topImages[0]
      product.title= this.goods.title
      product.desc= this.goods.desc
      product.price= this.goods.realPrice
      product.iid= this.iid
      //将商品添加到购物车里
      //this.$store.commit('addCart', product)
      this.addCart(product).then(res=>{
        // this.message=res
        // this.show=true
        // setTimeout(()=>{
        //   this.show=false
        //   this.message=''
        // },1200)
       // console.log(res)
        this.$toast.show(res,2000)
      })
     // this.$store.dispatch('addCart', product).then(res=>{
      //  console.log(res)
     // })
    }
}
}
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color: #ffffff;
  height:100vh;
}
.detail-nav{
  width: 100%;
  position: fixed;
  z-index: 9;
  background-color: #fff;
  top: 0;
}
.content{
 /* height: calc(100% - 44px); */
  height: calc(100vh - 44px - 58px);
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 58px;
  left: 0;
  right: 0;
}

</style>
