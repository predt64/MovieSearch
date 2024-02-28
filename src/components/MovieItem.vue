<!-- компонент с данными о фильме -->
<template>
  <div class="upper-wrapper">
    <!-- при нажатии в любую часть компонента скроетя панель оценки фильма (звездочки) -->
    <div class="wrapper" @click="show = false">
      <!-- при нажатии на данный блок происходит перенос на страницу фильма с более
           полной информацией -->
      <router-link :to="'/movie/' + movie.id" class="link">
        <div class="poster-and-info">
          <div class="poster">
            <img
              :src="movie.poster.previewUrl"
              alt="logo"
              class="poster__image"
            />
          </div>
          <!-- информация о фильме, если какого то параметра нет то он заменяется прочерком -->
          <div class="info">
            <p class="info__name">
              {{ movie.name }}
            </p>
            <div class="info__subtitle-wrapper">
              <p class="info__subtitle">
                <span v-if="movie.alternativeName">
                  {{ movie.alternativeName }},
                </span>
                <span v-else-if="movie.enName"> {{ movie.enName }}, </span>
                <span v-else> —, </span>

                <span v-if="movie.year"> {{ movie.year }}, </span>
                <span v-else> —, </span>

                <span v-if="movie.movieLength">
                  {{ movie.movieLength }} мин.
                </span>
                <span v-else> — </span>
              </p>

              <p class="info__sub-subtitle">
                <span v-if="movie.countries.length > 0"
                  >{{ movie.countries[0].name }} •
                </span>
                <span v-else> — </span>
                <span v-if="movie.genres.length > 0">{{
                  movie.genres[0].name
                }}</span>
                <span v-else> — </span>
              </p>
            </div>
          </div>
        </div>
      </router-link>
      <div class="actions">
        <rating-number :rating="movie.rating.kp" :votes="movie.votes.kp" />

        <button-favourite
          @liked="liked = 1"
          @disliked="liked = 0"
          :liked="liked"
          :movie="movie"
        />
        <!-- привязваем текущий статус отображения звезд для оценивания фильма и
             подписываемся на событие, если их сокрытия из самого компонента -->
        <my-rating
          v-model="rating"
          :show="show"
          @changeShow="show = !show"
          :movie="movie"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useStorage } from "@/store/app.js";

export default {
  setup() {
    const storage = useStorage();
    return { storage };
  },
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      liked: this.checkLiked(),
      show: false,
      rating: this.checkRating(),
    };
  },

  methods: {
    checkLiked() {
      //если в БД есть фильм с таким id и у него проставлен лайк
      return this.storage.favMovies.some(
        (el) => el.id == this.movie.id && el.liked == 1
      );
    },
    //то же что и в checkLiked только для рейтинга
    checkRating() {
      if (
        this.storage.favMovies.some(
          (el) => el.id == this.movie.id && el.userRating != undefined
        )
      )
        return this.storage.favMovies.filter((el) => el.id == this.movie.id)[0]
          .userRating;
      else return 0;
    },
  },
  
};
</script>

<style lang="scss" scoped>
.upper-wrapper {
  background-color: beige;
  max-width: 1080px;
  margin: 0 auto;
}
.wrapper {
  max-width: 1080px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  background-color: beige;
  padding: 0 20px;
  padding-top: 10px;
  transition: 0.15s;
}
.wrapper:hover {
  border-radius: 20px;
  background-color: rgb(231, 231, 204);
  transition: 0.15s;
}
.link {
  text-decoration: none;
  flex-grow: 2;
}
.poster-and-info {
  display: flex;
  cursor: pointer;
}
.poster__image {
  max-width: 140px;
}
.info {
  padding-top: 6px;
  padding-left: 10px;
  max-width: 550px;
}
.info__subtitle-wrapper {
  color: rgb(69, 67, 67);
  font-weight: 300;
}
.info__subtitle {
  padding-bottom: 5px;
}
.info__name {
  color: black;
  font-size: 20px;
  font-weight: 600;
  padding-bottom: 12px;
}
.actions {
  padding: 6px 10px 0 0;
  display: flex;
  flex-direction: row;
  gap: 20px;
}
</style>
