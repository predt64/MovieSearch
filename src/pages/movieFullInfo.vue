<template>
  <my-navbar />
  <my-loader v-if="storage.loader" />
  <div class="wrapper" v-else @click="show = false">
    <div class="movie-wrapper">
      <!-- очень по-долгу картинки иногда грузятся, либо у меня интернет медленный,
      либо картинки много весят, либо я что-то не так сделала -->
      <div class="movie__poster">
        <img
          :src="this.storage.movieInfo.poster.previewUrl"
          alt="logo"
          class="movie__poster__item"
        />
        <p class="description">
          Описание:
          <span class="description__main">{{
            this.storage.movieInfo.description
          }}</span>
        </p>
      </div>

      <div class="movie__info">
        <div class="movie__info__main">
          <p class="movie__info__name">
            {{ this.storage.movieInfo.name }}
            <span class="movie__info__year"
              >({{ this.storage.movieInfo.year }})</span
            >
          </p>
          <p class="movie__info__eng-name">
            {{ this.storage.movieInfo.alternativeName }}
            <span class="movie__info__age">
              {{ this.storage.movieInfo.ageRating }}+
            </span>
          </p>
          <button-favourite
            class="movie__info__button"
            @liked="liked = 1"
            @disliked="liked = 0"
            @click.stop
            :liked="liked"
            :movie="storage.movieInfo"
          />
        </div>

        <div class="movie__info__side">
          <div class="movie__info__side__type">
            <p class="movie__info__side__title">О фильме</p>

            <p class="movie__info__side__box">Год Производства</p>
            <p class="movie__info__side__box">Страна</p>
            <p class="movie__info__side__box">Жанры</p>
            <p class="movie__info__side__box">Продолжительность</p>
            <p class="movie__info__side__box">Рейтинг IMDB</p>
          </div>
          <div class="movie__info__side__main">
            <p class="movie__info__side__info">
              {{ this.storage.movieInfo.year }}
            </p>
            <p class="movie__info__side__info">
              {{ this.storage.movieInfo.countries[0].name }}
            </p>
            <p class="movie__info__side__info">
              <span
                v-for="(genre, index) in this.storage.movieInfo.genres"
                :key="genre"
              >
                <span v-if="index < 3" class="genre">
                  {{ genre.name + " " }}
                </span>
              </span>
            </p>
            <p class="movie__info__side__info">
              {{ this.storage.movieInfo.movieLength }} мин.
            </p>
            <p class="movie__info__side__info">
              {{ this.storage.movieInfo.rating.imdb }}
            </p>
          </div>
        </div>
      </div>

      <div class="rating-and-similar">
        <div class="movie__rating">
          <rating-number :movie="this.storage.movieInfo" />
          <my-rating
            v-model="rating"
            :show="show"
            @changeShow="this.show = !this.show"
            :id="this.storage.movieInfo.id"
            class="movie__rating__action"
          />
        </div>
        <div class="movie__similar">
          <p class="movie__similar__title">Схожее:</p>
          <div
            class="movie__similar__item"
            v-for="movie in storage.similarMovies"
            :key="movie.id"
          >
            <div class="link" @click="id=movie.id">
              <img
                :src="movie.poster.previewUrl"
                alt="Poster"
                class="movie__similar__poster"
              />
              <p class="movie__similar__name">{{ movie.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStorage } from "@/store/app.js";
import MyNavbar from "@/components/MyNavbar.vue";

export default {
  setup() {
    const storage = useStorage();
    return { storage };
  },
  components: {
    MyNavbar,
  },
  data() {
    return {
      id: this.$route.params.id,
      liked: -1,
      show: false,
      rating: -1,
    };
  },
  methods: {
    getRating() {
      let flag=0
      this.storage.favMovies.forEach((el) => {
        if (el.id == this.storage.movieInfo.id && el.userRating != undefined) {
          this.rating = el.userRating;
          flag=1
        }
      });
      if (flag==0) this.rating = 0;
    },
    getLiked() {
      let flag=0
      this.storage.favMovies.forEach((el) => {
        if (el.id == this.storage.movieInfo.id && el.liked != undefined) {
          this.liked = el.liked;
          flag=1
        }
      });
      if (flag==0) this.liked = 0;
    },
  },
  watch: {
    rating() {
      let flag = 0;
      this.storage.favMovies.forEach((el) => {
        if (el.id == this.storage.movieInfo.id) {
          if (this.rating != 0) el.userRating = this.rating;
          flag = 1;
        }
      });
      if (flag == 0 && this.rating != 0) {
        this.storage.favMovies.push(this.storage.movieInfo);
        this.storage.favMovies[this.storage.favMovies.length - 1].userRating =
          this.rating;
      }
    },
    async id(){
    await this.storage.getSimilarMovies(this.id);
    this.getLiked();
    this.getRating();
    }
  },
  async created() {
    await this.storage.getSimilarMovies(this.id);
    this.getLiked();
    this.getRating();
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 1080px;
  margin: 0 auto;
  background-color: beige;
  height: 92vh;
}
.movie-wrapper {
  display: flex;
  justify-content: space-between;
  padding: 25px 15px;
  flex-basis: 33%;
}
.movie__poster {
  position: relative;
}
.movie__poster__item {
  max-width: 250px;
}
.movie__info {
  flex-grow: 4;
  max-width: 640px;
  padding-left: 15px;
}
.movie__info__name {
  font-weight: 900;
  font-size: 35px;
}
.movie__info__eng-name {
  font-weight: 400;
  color: gray;
}
.movie__info__button {
  padding-top: 15px;
}
.movie__info__side {
  padding-top: 30px;
  display: flex;
  font-size: 15px;
}
.movie__info__side__title {
  font-size: 25px;
  margin-bottom: 10px;
}
.movie__info__side__main {
  flex-grow: 2;
  align-self: flex-end;
  margin-left: 20px;
}
.rating-and-similar {
  flex-grow: 1;
}
.movie__rating {
  display: flex;
  justify-content: space-around;
}
.movie__rating__action {
  margin-top: 7px;
}
.genre {
  text-transform: capitalize;
}
.movie__info__side__box {
  color: gray;
  margin-bottom: 5px;
}
.movie__info__side__info {
  color: black;
  margin-bottom: 5px;
}
.description {
  position: absolute;
  width: 710px;
  bottom: 0;
}
.movie__similar {
  margin-top: 30px;
  text-align: center;
}
.movie__similar__item {
  width: 250px;
  margin: 0 auto;
  margin-bottom: 10px;
}
.movie__similar__title{
font-size: 20px;
margin-bottom: 10px;
font-weight: 600;
}
.movie__similar__poster {
  max-width: 100px;
}
.movie__similar__name {
  max-width: 250px;
}
.link{
  cursor: pointer;
}
</style>
