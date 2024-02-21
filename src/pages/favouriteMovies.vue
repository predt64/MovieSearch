<template>
  <my-navbar :fav="1" />

  <header class="header">
    <my-search :disableSearch="1">
      <p class="search__title">Your favorite</p>
    </my-search>
  </header>

  <main class="main">
    <div
      class="movie-list__wrapper"
      v-if="Object.keys(storage.favMovies).length > 0"
    >
      <div class="pages-select__wrapper">
        <my-select
          v-model="selectedSort"
          :options="selectOptions"
          class="select"
        />
      </div>
      <movie-item
        v-for="movie in storage.favMovies"
        :key="movie.id"
        :movie="movie"
      />
    </div>
    <p v-else class="main__error">
      В избранном пока пусто!<br />добавляйте фильмы в избранное на главной
      странице
    </p>
  </main>
</template>

<script>
import MySearch from "@/components/MySearch.vue";
import MyNavbar from "@/components/MyNavbar.vue";
import MovieItem from "@/components/MovieItem.vue";
import { useStorage } from "@/store/app.js";

export default {
  setup() {
    const storage = useStorage();
    return { storage };
  },
  components: {
    MySearch,
    MyNavbar,
    MovieItem,
  },
};
</script>

<style lang="scss" scoped>
.search__title {
  font-size: 80px;
  font-weight: bold;
}
.main {
  background-color: white !important;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 10%,
    rgba(0, 0, 0, 0.4) 90%,
    rgba(0, 0, 0, 0.3) 100%
  );
  background-repeat: no-repeat;
  text-align: center;
  min-height: 380px;
}
.main__error {
  color: white;
  font-size: 60px;
}
.pages-select__wrapper {
  position: relative;
  display: flex;
  max-width: 1080px;
  margin: 0 auto;
  justify-content: center;
justify-content: flex-end
}
.select {
  max-width: 240px;
  max-height: 58px;
}
</style>
