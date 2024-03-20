<template>
  <my-navbar :fav="1" />

  <header class="header">
    <my-search :disableSearch="1">
      <p class="title">Your favorite</p>
    </my-search>
  </header>

  <main class="main">
    <div class="movie-list" v-if="storage.favMovies.length > 0">
      <!-- сортировка -->
      <div class="select">
        <my-select
          v-model="selectedSort"
          :options="selectOptions"
          class="select__item"
        />
      </div>
      <!-- вывод избранных фильмов из массива сохраненных в favMovies фильмов-->
      <movie-item
        v-for="movie in storage.favMovies"
        :key="movie.id"
        :movie="movie"
      />
    </div>
    <!-- если в storage.favMovies нет фильмов => пока нет добавленных в избранное  -->
    <p v-else class="main__error">
      В избранном пока пусто!<br />добавляйте фильмы в избранное<br /> на главной
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
  data() {
    return {
      selectedSort: "По умолчанию",
      selectOptions: ["По рейтингу", "По дате выхода", "По хронометражу"],
    };
  },
  methods: {},
  watch: {
    // переиспользовать бизнес-логику сортировки с главной страницы, к сожалению,
    // не получилось, т.к. данные об избранных фильмах хранятся в массиве,
    // а не на сервере. Конечно, хотелось бы добавленные в избранное фильмы
    // хранить на сервере, но я не особо пока представляю как это делать,
    // не уверен, поддерживает ли вообще json-server, который я использую для создания
    // фейкового REST API, функцию динамической подгрузки новых сохраненных в БД данных
    // (по крайней мере таких встроенных функций там пока нет),
    // так что решил довольствоваться этим решенем, раз другое не обязательно
    selectedSort() {
      let sortValue = "";
      if (this.selectedSort == "По рейтингу") sortValue = "rating";
      else if (this.selectedSort == "По хронометражу")
        sortValue = "movieLength";
      else sortValue = "year";

      this.storage.favMovies.sort((a, b) =>
        typeof a[sortValue] == "object"
          ? b[sortValue].kp - a[sortValue].kp
          : b[sortValue] - a[sortValue]
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
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
  min-height: 380px;
}
.main__error {
  color: white;
  font-size: 60px;
  text-align: center;
}
.select {
  position: relative;
  display: flex;
  max-width: 1080px;
  margin: 0 auto;
  justify-content: center;
  justify-content: flex-end;
}
.select__item {
  max-width: 240px;
  max-height: 58px;
}
</style>