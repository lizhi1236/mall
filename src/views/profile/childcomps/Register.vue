<template>
    <div class="register">
        <div class="user">
             <img class="userimg" src="~assets/img/profile/avatar.svg" alt="">
        </div>
        <div class="userphone">
           <p>登录/注册</p>
           <div class="abcd">
               <img class="phoneimg" src="~assets/img/profile/phone.svg" alt="">
               <span class="spanitem">暂无绑定手机号</span>
           </div>
        </div>
        <div class="entermore"><img class="enterto" src="~assets/img/common/arrow-left.svg" alt=""></div>
    </div>
</template>
<script>
export default {
    name:'Register',

}
</script>
<style scoped>
.register{
    width: 100%;
    position: relative;
    left: 0;
    right: 0;
    height: 85px;
    padding: 6px 15px;
    background-color: #ff8198;
    display: flex;
    color: #fff;
}

.userphone{
    flex: 1;
    padding-left:16px;
    padding-top: 16px;
}
.phoneimg{
    width: 20px;
    height: 30px;
    vertical-align: middle;
}
.spanitem{
    font-size:12px;
}
.entermore{
    line-height: 84px;
}
.userimg{
    width: 70px;
    height: 70px;
}
.enterto{
    width: 20px;
    vertical-align: middle;
}
</style>