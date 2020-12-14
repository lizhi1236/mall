<template>
<div class="wrapper" ref="wrapper">
  <div class="content">
    <slot></slot>
  </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "Scroll",
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default: false
    },
    click: {
        type: Boolean,
        default: true
      },
    data: {
        type: Array,
        default() {
          return []
        }
      }
  },
  data(){
    return{
      scroll:null
    }
  },
  created() {
//     this.$nextTick(() => {  
//     if (!this.scroll) {  
//     this.scroll = new BScroll(this.$refs.wrapper, {})  
//     console.log(this.scroll)  
//     }  
//  })  
  },
  computed: {
    	scrollY() {
    		return this.scroll.y
      }
    },
  mounted() {
    setTimeout(this._initScroll, 200)
  },
  methods: {
    _initScroll() {
      //1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        click:this.click,
        probeType:this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      //2.监听滚动的位置
      if(this.probeType===2||this.probeType===3){
        this.scroll.on('scroll',(position)=>{
          this.$emit('scroll',position)
        })
      }

      //3.监听scroll滚动到底部
      if(this.pullUpLoad){
        this.scroll.on('pullingUp',()=>{
          this.$emit('pullingUp')
        })
      }
    },
     scrollTo(x,y,time=100){
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time);
    },
    refresh(){
      this.scroll && this.scroll.refresh && this.scroll.refresh()
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
    }
  },
  watch: {
      data() {
	      setTimeout(this.refresh, 20)
      }
    }
}
</script>

<style scoped>
  .wrapper {
    overflow: hidden;
  }
</style>
