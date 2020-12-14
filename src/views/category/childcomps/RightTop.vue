<template>
     <div class="righttop">
            <div v-for="(item,index) in righttopitems.list"  class="righttopitem" :key="index">
               <a :href="item.link">
                  <img :src="item.image" alt="">
                  <p>{{item.title}}</p>
               </a>
            </div>  
    </div>  
</template>
<script>


export default {
    name:"RightTop",
    components:{
       
    },
    data(){
        return{
          
        }
    },
    props:{
        righttopitems:{
            type:Object,
            default(){

            }
        }
    }

}
</script>
<style scoped>
.righttop{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content:flex-start;
}
.righttopitem{
    width:82px;
    height: 96px;
    margin-left: 10px;
    text-align: center;
    margin-top: 10px;
    
}
.righttopitem p{
    font-size: 12px;

    color: #666;
    margin-top: 10px;
}
.righttopitem img{
    width: 64px;
}
</style>