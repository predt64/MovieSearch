<template>
  <div class="upper-wrapper">
    <div class="wrapper" @click="show = false">
      <router-link :to="'/movie/' + movie.id" class="link">
        <div class="img-info-wrapper">
          <div class="poster">
            <img
              v-if="this.movie.poster.previewUrl !== null"
              :src="this.movie.poster.previewUrl"
              alt="logo"
              class="poster__image"
            />
            <img
              v-else
              src="https://res.cloudinary.com/shop-consoles-ru/image/upload/c_scale,w_1000/v1568607967/images/no_image_avalible_jwqnxa.jpg"
              alt="logo"
              class="poster__image"
            />
          </div>

          <div class="info">
            <p class="info__name">
              {{ this.movie.name }}
            </p>
            <div class="info__subtitle__wrapper">
              <p class="info__subtitle">
                <span v-if="this.movie.alternativeName">
                  {{ this.movie.alternativeName }},
                </span>
                <span v-else-if="this.movie.enName">
                  {{ this.movie.enName }},
                </span>
                <span v-else> —, </span>

                <span v-if="this.movie.year"> {{ this.movie.year }}, </span>
                <span v-else> —, </span>

                <span v-if="movie.movieLength">
                  {{ this.movie.movieLength }} мин.
                </span>
                <span v-else> — </span>
              </p>

              <p class="info__sub-subtitle">
                <span
                  class="info__sub-subtitlle__country"
                  v-if="movie.countries.length > 0"
                  >{{ movie.countries[0].name }} •
                </span>
                <span v-else> — </span>
                <span
                  class="info__sub-subtitlle__genre"
                  v-if="movie.genres.length > 0"
                  >{{ movie.genres[0].name }}</span
                >
                <span v-else> — </span>
              </p>
            </div>
          </div>
        </div>
      </router-link>
      <div class="actions">
        
        <rating-number :movie="movie"/>

        <button-favourite
          @liked="liked = 1"
          @disliked="liked = 0"
          :liked="liked"
          :movie="movie"
        />

        <my-rating
          v-model="rating"
          :show="show"
          @changeShow="this.show = !this.show"
          :id="movie.id"
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
  watch: {
    rating() {
      let flag = 0;
      this.storage.favMovies.forEach((el) => {
        if (el.id == this.movie.id) {
          if (this.rating != 0) el.userRating = this.rating;
          flag = 1;
        }
      });
      if (flag == 0 && this.rating != 0) {
        this.storage.favMovies.push(this.movie);
        this.storage.favMovies[this.storage.favMovies.length - 1].userRating =
          this.rating;
      }
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
.img-info-wrapper {
  display: flex;
  cursor: pointer;
}
.poster__image {
  max-width: 140px;
}
.info {
  padding-top: 6px;
  padding-left: 10px;
}
.info__subtitle__wrapper {
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
