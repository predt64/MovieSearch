<template>
  <my-navbar />
  <my-loader v-if="storage.loader" />
  <div class="wrapper" v-else @click="show = false">
    <div class="movie">
      <!-- очень по-долгу картинки иногда грузятся, либо у меня интернет медленный,
      либо картинки много весят, либо я что-то не так сделала -->
      <div class="movie__poster">
        <img
          :src="this.storage.movieInfo.poster.previewUrl"
          alt="logo"
          class="movie__poster-img"
        />
        <p class="description">
          Описание:
          <span class="description__main">{{
            this.storage.movieInfo.description
          }}</span>
        </p>
      </div>

      <div class="info">
        <div class="info__main">
          <p class="info__main-name">
            {{ this.storage.movieInfo.name }}
            <span> ({{ this.storage.movieInfo.year }}) </span>
          </p>
          <p class="info__main-engname">
            {{ this.storage.movieInfo.alternativeName }}
            <span> {{ this.storage.movieInfo.ageRating }}+ </span>
          </p>
          <button-favourite
            class="info__button"
            @liked="liked = 1"
            @disliked="liked = 0"
            @click.stop
            :liked="liked"
            :movie="storage.movieInfo"
          />
        </div>

        <div class="info__side">
          <div>
            <p class="info__side-title">О фильме</p>

            <p class="info__side-name">Год Производства</p>
            <p class="info__side-name">Страна</p>
            <p class="info__side-name">Жанры</p>
            <p class="info__side-name">Продолжительность</p>
            <p class="info__side-name">Рейтинг IMDB</p>
          </div>
          <div class="info__side-box">
            <p class="movie__side-answer">
              {{ this.storage.movieInfo.year }}
            </p>
            <p class="movie__side-answer">
              {{ this.storage.movieInfo.countries[0].name }}
            </p>
            <p class="movie__side-answer">
              <span
                v-for="(genre, index) in this.storage.movieInfo.genres"
                :key="genre"
              >
                <span v-if="index < 3" class="genre">
                  {{ genre.name + " " }}
                </span>
              </span>
            </p>
            <p class="movie__side-answer">
              {{ this.storage.movieInfo.movieLength }} мин.
            </p>
            <p class="movie__side-answer">
              {{ this.storage.movieInfo.rating.imdb }}
            </p>
          </div>
        </div>
      </div>

      <div class="rating-and-similar">
        <div class="rating">
          <rating-number :movie="this.storage.movieInfo" />
          <my-rating
            v-model="rating"
            :show="show"
            @changeShow="this.show = !this.show"
            :id="this.storage.movieInfo.id"
            class="rating__item"
          />
        </div>
        <div class="similar">
          <p class="similar__title">Схожее:</p>
          <div
            class="similar__item"
            v-for="movie in storage.similarMovies"
            :key="movie.id"
          >
            <div class="link" @click="id = movie.id">
              <img
                :src="movie.poster.previewUrl"
                alt="Poster"
                class="similar__poster"
              />
              <p class="similar__name">{{ movie.name }}</p>
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
      let flag = 0;
      this.storage.favMovies.forEach((el) => {
        if (el.id == this.storage.movieInfo.id && el.userRating != undefined) {
          this.rating = el.userRating;
          flag = 1;
        }
      });
      if (flag == 0) this.rating = 0;
    },
    getLiked() {
      let flag = 0;
      this.storage.favMovies.forEach((el) => {
        if (el.id == this.storage.movieInfo.id && el.liked != undefined) {
          this.liked = el.liked;
          flag = 1;
        }
      });
      if (flag == 0) this.liked = 0;
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
    async id() {
      await this.storage.getSimilarMovies(this.id);
      this.getLiked();
      this.getRating();
    },
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
.movie {
  display: flex;
  justify-content: space-between;
  padding: 25px 15px;
  flex-basis: 33%;
}
.movie__poster {
  position: relative;
}
.movie__poster-img {
  max-width: 250px;
}
.info {
  flex-grow: 4;
  max-width: 640px;
  padding-left: 15px;
}
.info__main-name {
  font-weight: 900;
  font-size: 35px;
}
.info__main-engname {
  font-weight: 400;
  color: gray;
}
.info__button {
  padding-top: 15px;
}
.info__side {
  padding-top: 30px;
  display: flex;
  font-size: 15px;
}
.info__side-title {
  font-size: 25px;
  margin-bottom: 10px;
}
.info__side-box {
  flex-grow: 2;
  align-self: flex-end;
  margin-left: 20px;
}
.rating-and-similar {
  flex-grow: 1;
}
.rating {
  display: flex;
  justify-content: space-around;
}
.rating__item {
  margin-top: 7px;
}
.genre {
  text-transform: capitalize;
}
.info__side-name {
  color: gray;
  margin-bottom: 5px;
}
.movie__side-answer {
  color: black;
  margin-bottom: 5px;
}
.description {
  position: absolute;
  width: 727px;
  bottom: 0;
}
.similar {
  margin-top: 30px;
  text-align: center;
}
.similar__item {
  width: 250px;
  margin: 0 auto;
  margin-bottom: 10px;
}
.similar__title {
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: 600;
}
.similar__poster {
  max-width: 100px;
}
.similar__name {
  max-width: 250px;
}
.link {
  cursor: pointer;
}
</style>
