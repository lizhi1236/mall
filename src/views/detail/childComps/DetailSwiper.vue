<template>
<Swiper class="detail-swiper">
  <SwiperItem v-for="item in topImages">
    <img :src="item" alt="">
  </SwiperItem>
</Swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
  name: "DetailSwiper",
  props:{
    topImages:{
      type:Array,
      default(){
        return[]
      }
    }
  },
  components:{
    SwiperItem,
    Swiper
  }
}
</script>

<style scoped>
.detail-swiper{
  height: 256px;
  overflow: hidden;
}
</style>
