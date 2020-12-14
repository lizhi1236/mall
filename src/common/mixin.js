import {debance} from "common/utils"

export const itemListenerMixin={
  data(){
    return{
      itemImgListenner:null
    }
  },
  mounted(){
    //监听item中图片加载完成
    const refresh=debance(this.$refs.scroll.refresh,50)
    this.itemImgListenner=()=>{
      refresh()
    }
    this.$bus.$on('itemImageLoad',this.itemImgListenner)
   // console.log('混入');
  }
}

export const backTop={
  data(){
    return{
      showBack:false
    }
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0,1500)
    },
  }
}
