<template>
    <scroll class="leftitems">
     <div>
      <ul>
        <li v-for="(item, index) in leftItems" 
        class="item" 
        :class="{active: index === currentIndex}" 
        :key="index" 
        @click="itemClick(index)">
            {{item.title}}
        </li>
     </ul>
     </div>
    </scroll>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
export default {
    name:"LeftItems",
    components:{
        Scroll
    },
    props:{
        leftItems:{
          type:Array,
          defalut(){
            
        }
        }
    },
    data() {
        return{
            currentIndex: 0
        }
    },
    methods:{
        itemClick(index) {
            this.currentIndex = index
            this.$emit('itemClick', index)
        }
    }
}
</script>
<style scoped>
.leftitems{
    
 /* height: calc(100% - 44px); 
  height: calc(100vh - 44px - 49px);
  height: 100%;
  background-color: #F5F5F5;
  width:100px;
  box-sizing: border-box;*/
  width:100px;
  position: absolute;
  height: 100%;
  overflow: hidden;
  margin-top: 0;
  left:0;
  right: 0;
  background-color: #F5F5F5;
 
}

.item{
    width:100px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
}
.active{
    font-weight: 700;
    color: #ff5777;
    border-left: 2px solid var(--color-tint);
    background-color: #FFFFFF;
}
</style>