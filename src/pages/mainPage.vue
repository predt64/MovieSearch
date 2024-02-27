<template>
  <my-navbar @refresh="refresh" :main="1" />

  <header class="header">
    <my-search v-model="movieCurrent" @search="search">
      <p class="header__title">Fast. Convinient. Reliable.</p>
      <p class="header__subtitle">
        Unlock the magic of movies with our ultimate Movie Searcher!
      </p>
    </my-search>
  </header>

  <main class="main">
    <div
      class="pages-and-select__wrapper"
      v-if="!storage.loader && storage.movies.length > 0"
    >
      <movie-pages color="white" :request="movieCurrent" />
      <my-select
        v-model="selectedSort"
        :options="selectOptions"
        class="select"
      />
    </div>
    <my-loader v-if="storage.loader" class="loader"/>
    <movie-item
      v-else-if="storage.movies.length > 0"
      v-for="movie in storage.movies"
      :key="movie.id"
      :movie="movie"
      @addedToFavorite="addToFavorite(id)"
    />
    <p v-else class="main__error">
      Нет совпадений(ಥ﹏ಥ)<br />попробуйте еще раз
    </p>

    <movie-pages
      v-if="!storage.loader && storage.movies.length > 0"
      color="black"
      :request="movieCurrent"
    />
  </main>
</template>

<script>
import MoviePages from "@/components/MoviePages.vue";
import MovieItem from "@/components/MovieItem.vue";
import MySearch from "@/components/MySearch.vue";
import MyNavbar from "@/components/MyNavbar";
import { useStorage } from "@/store/app.js";
import { mapActions } from "pinia";
import { ref } from "vue";

export default {
  setup() {
    const storage = useStorage();
    return { storage };
  },
  components: {
    MovieItem,
    MoviePages,
    MySearch,
    MyNavbar,
  },
  data() {
    return {
      movieCurrent: ref(""),
      //сделать чтобы было = 1
      currentPage: 1,
      selectedSort: "По умолчанию",
      sortValue: "",
      selectOptions: ["По рейтингу", "По дате выхода", "По хронометражу"],
    };
  },
  methods: {
    ...mapActions(useStorage, ["$subscribe"]),
    search() {
      this.selectedSort = "По умолчанию";
      this.storage.currentPage = 1;
      this.currentPage = 1;
      this.storage.getMovies(this.movieCurrent);
    },
    addToFavorite() {
      //добавить в локалсторэдж id
    },
    refresh() {
      this.storage.currentPage = 1;
      this.currentPage = 1;
      this.movieCurrent = "";
      this.selectedSort = "По умолчанию";
      this.storage.getMovies(this.movieCurrent);
    },
  },
  watch: {
    selectedSort() {
      if (this.selectedSort != "По умолчанию") {
        this.storage.currentPage = 1;
        this.currentPage = 1;
        if (this.selectedSort == "По рейтингу") this.sortValue = "rating.kp";
        else if (this.selectedSort == "По хронометражу")
          this.sortValue = "movieLength";
        else this.sortValue = "year";
        this.storage.getMovies(this.movieCurrent, this.sortValue);
      }
    },
  },
  mounted() {
    this.storage.getMovies("");

    this.$subscribe((mutation, state) => {
      if (state.currentPage != this.currentPage) {
        this.storage.getMovies(this.movieCurrent, this.sortValue);
        this.currentPage = state.currentPage;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.header__title {
  font-size: 50px;
  font-weight: 800;
}
.header__subtitle {
  font-size: 30px;
}
.v-card {
  box-shadow: none;
}
.v-card-text {
  background-color: #151719;
}
.v-field__append-inner {
  cursor: pointer !important;
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
  min-height: 371px;
}
.main__error {
  color: white;
  font-size: 60px;
  text-align: center;
}
.loader {
  height: 371px;
}
.pages-and-select__wrapper {
  position: relative;
  display: flex;
  max-width: 1080px;
  margin: 0 auto;
  justify-content: center;
}
.select {
  position: absolute;
  right: 0px;
}
</style>
