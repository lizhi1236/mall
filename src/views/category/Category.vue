<template>
  <div id="category" class="wrapper">
    <nav-bar class="category-nav"><div slot="center" class="">商品分类</div></nav-bar>
    <div class="content">
      <left-items :leftItems="leftItems" 
                  @itemClick="itemClick" ></left-items>
      <scroll id="right" :data="[categoryData]" ref="scroll">
        <div>
        <right-top :righttopitems="showSubcategory" ></right-top>
        <tab-control :titles="titles" @tabClick="tabClick"></tab-control>
        <goods-list :goods="showCategoryDetail"></goods-list>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import LeftItems from './childcomps/LeftItems'
import RightTop from './childcomps/RightTop'

import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import {getLeftItems, getRightTop, getGoods} from 'network/category'
export default {
  name: "Category",
  components:{
    NavBar,
    LeftItems,
    RightTop,
    TabControl,
    GoodsList,
    Scroll
  },
  data(){
    return{
      leftItems: [],
      categoryData:{},
      currentIndex: -1,
      titles:['综合','新品','销量'],
      currentType: 'pop'
    }
  },
  created(){
    //1.请求分类数据
    this.getLeftItemsStart()
    // 2.监听图片加载完成
	  this.$bus.$on('itemImageLoad', () => {
		  this.$refs.scroll.refresh()
      })
    
  },
  computed:{
    	  showSubcategory() {
		    if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].righttopitems
      },
      showCategoryDetail() {
		    if (this.currentIndex === -1) return []
		    return this.categoryData[this.currentIndex].rightBottomItems[this.currentType]
      }
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
    },

    
    getLeftItemsStart() {
      //1.获取分类数据
      getLeftItems().then(res => {
      console.log(res)
      this.leftItems = res.data.category.list
      //2.初始化每个类别的子数据
      for (let i = 0; i < this.leftItems.length; i++ ) {
        this.categoryData[i] = {
          righttopitems:{},
          rightBottomItems:{
            'pop': [],
            'new': [],
            'sell': []
          }
        }
      }
      //3.请求第一个分类数据
      this.getRightTopStart(0)
    })
    },
    getRightTopStart(index){
      this.currentIndex = index
      const mailKey = this.leftItems[index].maitKey
      getRightTop(mailKey).then(res => {
        console.log(res)
        this.categoryData[index].righttopitems = res.data
        this.categoryData = {...this.categoryData}
        this.getGoodsStart("pop")
        this.getGoodsStart("new")
        this.getGoodsStart("sell")
      })
    },
    getGoodsStart(type){
      //1.获取请求的miniWallkey
      // this.currentType = type
      const miniWallkey = this.leftItems[this.currentIndex].miniWallkey
      // 2.发送请求,传入miniWallkey和type
      getGoods(miniWallkey, type).then(res =>{
        console.log(res)
        this.categoryData[this.currentIndex].rightBottomItems[type] = res
        this.currentType = type
        this.categoryData = {...this.categoryData}
      })
      
    },
    itemClick(index){
      this.getRightTopStart(index)
    }

  }
}
</script>

<style scoped>
#category{
  height: 100vh;

}
.category-nav{
   position: fixed;
   width:100%;
   z-index: 9;
   background-color: var(--color-tint);
   font-weight: 700;
   color: #fff;
}
 .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }
 #right{
  width: 75%;
  height: 100%;
  position: relative;
  left: 25%;
  background-color: #ffffff;
} 
</style>
