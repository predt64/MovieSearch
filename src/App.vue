<template>
  <!-- navbar -->
  <my-navbar/>
  <router-view></router-view>
</template>

<script >
import MyNavbar from "@/components/MyNavbar"
export default{
  components:{
    MyNavbar,
  }
}
</script>

<style lang="scss">
.v-application__wrap{
  background-color: #ffffff
}
body{
  background-color: #3f4041;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 0.4) 90%, rgba(0, 0, 0, 0.3) 100%)
}
</style>
