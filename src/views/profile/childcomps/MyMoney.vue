<template>
   <div class="mymoney">
       <div class="lastmoney">
           <p><span class="number">0.00</span>元</p>
           <p>我的余额</p>
       </div>
       <div class="lastsold">  
           <p><span class="number">0</span>个</p>
           <p>我的优惠</p>
       </div>
       <div class="lastsell">  
           <p><span class="number">0</span>分</p>
           <p>我的积分</p>
       </div>
   </div>
</template>

<script>
export default {
    name:'MyMoney'
}
</script>
<style scoped>
.mymoney{
    width: 100%;
    height: 84px;
    position: relative;
    display: flex;
    justify-content:space-between;
    font-size: 13px;
    
}
.lastmoney{
    width: 33.2%;
    height: 84px;
    background-color: #ffffff;
    text-align: center;
    padding-top:26px;
}
.lastsold{
    width: 33.2%;
    height: 84px;
    background-color: #ffffff;
    text-align: center;
    padding-top:26px;
}
.lastsell{
    width: 33.2%;
    height: 84px;
    background-color: #ffffff;
    text-align: center;
    padding-top:26px;
}
.number{
    font-size: 24px;
    color: #ff5f3e;
    font-weight: 700;
}
</style>