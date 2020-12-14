<template>
  <div id="profile">
    <nav-bar class="profile-nav">
      <div slot="center" class="">我的</div>
    </nav-bar>
    <div class="content">
      <register></register>
      <my-money></my-money>
      <profile-list></profile-list>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Register from "./childcomps/Register";
import MyMoney from "./childcomps/MyMoney.vue";
import ProfileList from "./childcomps/ProfileList.vue";
export default {
  name: "Profile",
  components: {
    NavBar,
    Register,
    MyMoney,
    ProfileList,
  },
};
</script>

<style scoped>
.profile-nav {
  position: fixed;
  width: 100%;
  z-index: 9;
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}
.content {
  position: relative;
  top: 43px;
  background-color: #f2f2f2;
}
</style>
