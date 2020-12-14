<template>
<div id="home">
  <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
  <tab-control class="tabcontrol"
              :titles="titles"
              @tabClick="tabClick"
              ref="tabControl1"
              v-show="isTabFixed">

  </tab-control>

  <scroll class="content"
          ref="scroll"
          :probe-type="3"
          @scroll="contentScroll"
          :pull-up-load="true"
          @pullingUp="loadMore">
    <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control class="tabcontrol"
                :titles="titles"
                @tabClick="tabClick"
                ref="tabControl2">

    </tab-control>
    <goods-list :goods="showGoods"></goods-list>
  </scroll>

  <back-top @click.native="backClick" v-show="showBack"></back-top>
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'

import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from "components/content/goods/GoodsList";

import HomeSwiper from './childcomps/HomeSwiper'
import RecommendView from './childcomps/RecommendView'
import FeatureView from './childcomps/FeatureView'

import {getHomeMultidata,getHomeGoods} from "network/home"
import {itemListenerMixin,backTop} from "common/mixin";

import BackTop from 'components/content/backtop/BackTop'
export default {
  name: "Home",
  components:{
    NavBar,
    TabControl,
    GoodsList,

    HomeSwiper,
    RecommendView,
    FeatureView,

    Scroll,
    BackTop
  },
  mixins:[itemListenerMixin,backTop],
  data(){
    return{
      titles:['流行','新款','精选'],
      banners:[],
      recommends:[],
      goods:{
        'pop': {page:0, list:[]},
        'new': {page:0, list:[]},
        'sell': {page:0, list:[]},
      },
      currentType:'pop',
      tabOffsetTop:0,
      isTabFixed:false,
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  activateded(){

  },
  deactivated() {
    //取消全局事件的监听
    this.$bus.$off('itemImageLoad',this.itemImgListenner)
  },
  created() {
    //请求多个数据
    this.getHomeMultidata()
    //请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
  },
  methods:{
    //事件监听相关的方法
    tabClick(index){
      switch (index){
        case 0:
          this.currentType='pop'
          break
        case 1:
          this.currentType='new'
          break
        case 2:
          this.currentType='sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;

    },
    contentScroll(position){
      //1.判断backTop是否显示
      this.showBack=(-position.y)>1000
      //2.决定tabControl是否吸顶
      this.isTabFixed=(-position.y)>this.tabOffsetTop
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad(){
      this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
    },
    //网络请求相关的方法
    getHomeMultidata(){
      getHomeMultidata().then(res => {
     // console.log(res);
      this.banners =res.data.banner.list;
      this.recommends =res.data.recommend.list;
    })},
    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res =>{
        console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page+=1;
        //完成上拉加载更多
        this.$refs.scroll.finishPullUp()

      })
    }
  }
}
</script>

<style scoped>
#home{
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.home-nav{
  height: 44px;
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top:0;
  z-index: 9;
}

.tabcontrol{
  position:sticky;
  background-color: var(--color-background);
  top:44px;
  z-index: 9;
}
.content{
  position: absolute;
  overflow: hidden;
  top:43px;
  bottom: 49px;
  left:0;
  right: 0;
}
.fixed{
  position: relative;
  right: 0;
  left: 0;
  top: 44px;
  z-index: 9;
}
</style>
