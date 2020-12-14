<template>
    <div class="profilelist">
        <div class="messages">
            <img src="~assets/img/profile/message.svg" alt="">
            <div class="">我的消息</div>
        </div>
        <div class="messages">
            <img src="~assets/img/profile/pointer.svg" alt="">
            <div>积分商城</div>
        </div>
        <div class="messages">
            <img src="~assets/img/profile/vip.svg" alt="">
            <div>会员卡</div>
        </div>
        <div class="messages distance">
            <img src="~assets/img/profile/cart.svg" alt="">
            <div>我的购物车</div>
        </div>
        <div class="messages">
            <img src="~assets/img/profile/shopping.svg" alt="">
            <div>下载购物App</div>
        </div>
    </div>
</template>
<script>
export default {
    name:'ProfileList',
}
</script>
<style scoped>
.profilelist{
    margin-top: 15px;
    font-size: 15px;
}
.messages{
    height: 45px;
    vertical-align: center;
    background-color: #ffffff;
    display: flex;
}
.messages div{
    width: 336px;
    height: 45px;
    line-height: 45px;
    border-bottom: 1px solid #f2f2f2;
}
.messages img{
    width: 20px;
    height: 20px;
    margin: 12px 14px;
}
.distance{
    margin-top: 15px;
}
</style>