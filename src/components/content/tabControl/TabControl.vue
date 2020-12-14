<template>
  <div class="tabcontrol">
    <div v-for="(item,index) in titles" class="tab-item" :class="{active: index === currentIndex}" @click="itemClick(index)">
     <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props:{
    titles:{
      type:Array,
      default(){
        return[]
      }
    }
  },
  data(){
    return{
      currentIndex:0
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex=index;
      this.$emit('tabClick',index)
    }
  }
}
</script>

<style scoped>
.tabcontrol{
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
}
.tab-item{
  flex: 1;
}
.active{
  color: var(--color-high-text);
}
.active span{
  border-bottom: 2px solid var(--color-tint);
  padding: 3px;
}
</style>
