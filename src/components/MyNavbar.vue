<template>
  <div class="navbar__upper-wrapper">
    <div class="navbar__wrapper">

      <div class="navbar">

        <router-link to="/" class="navbar__title" @click="refresh">
          <img class="logo" src="@/img/navbar.png" alt="logo" />
          <div class="navbar__title-main"><strong>Movie</strong>Search</div>
        </router-link>

        <div class="navbar__references">
          
          <router-link
            to="/"
            :class="{
              references__item: true,
              active: main,
            }"
            @click="refresh"
            >Главная</router-link
          >

          <router-link
            to="/favourite"
            :class="{
              references__item: true,
              active: fav,
            }"
            >Закладки</router-link
          >

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { useStorage } from "@/store/app.js";

export default {
  props: {
    fav: {
      type: Number,
      default: 0,
    },
    main: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    const storage = useStorage();
    return { storage };
  },
  methods: {
    refresh() {
      location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
.active {
  color: black !important;
}
.navbar__upper-wrapper {
  background: linear-gradient(to right, rgb(231, 68, 18), rgb(255, 98, 78));
}
.navbar__wrapper {
  max-width: 1080px;
  margin: 0 auto;
}
.navbar {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
}
.navbar__title {
  display: flex;
  align-items: center;
  font-size: 22px;
  font-weight: bolder;
  cursor: pointer;
  color: black;
  text-decoration: none;
}
.logo {
  max-width: 50px;
}
.navbar__references {
  display: flex;
  align-items: center;
  font-size: 17px;
}
.references__item {
  text-decoration: none;
  color: white;
  font-weight: bold;
  transition: 0.15s;
}
.references__item:hover {
  transition: 0.2s;
  color: black;
}
.references__item:last-child {
  margin-left: 40px;
}
</style>
