<template>
  <div class="upper-wrapper">
    <div class="wrapper">
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

      <div class="actions">
        <div class="actions__rating">
          <span
            :class="{
              actions__rating__number: true,
              actions__rating__number_gold: movie.rating.kp.toFixed(1) >= 8,
              actions__rating__number_green:
                movie.rating.kp.toFixed(1) >= 7 &&
                movie.rating.kp.toFixed(1) < 8,
              actions__rating__number_red: movie.rating.kp.toFixed(1) < 6,
            }"
            v-if="movie.rating.kp > 0"
            >{{ movie.rating.kp.toFixed(1) }}</span
          >
          <span v-else> — </span>

          <span class="actions__rating-votes" v-if="movie.votes.kp > 0">{{
            numberWithSpaces(movie.votes.kp)
          }}</span>
          <span v-else> — </span>
        </div>

        <div class="actions__add-to-favourite">
          <button class="add__button">
            <span class="material-icons heart" @click="addedToFavorite">favorite</span>
            В избранное
          </button>
        </div>

        <div class="actions__evaluate">
          <button class="actions__evaluate__button" @click="show = !show">
            <span class="material-icons star">star</span>
          </button>
          <div class="actions__evaluate__bar_box">
            <v-rating
              class="actions__evaluate__bar"
              v-if="show == 1"
              active-color="darkred"
              half-increments
              hover
            ></v-rating>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits:['addedToFavorite'],
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      show: 0,
      rating: 0,
    };
  },
  methods: {
    addedToFavorite(){
        this.$emit('addedToFavorite', this.movie.id);
      },
    numberWithSpaces(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    checkClicked() {
      return this.show;
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
.actions__rating {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.actions__rating__number {
  font-weight: 800;
  margin-right: 5px;
  font-size: 19px;
}
.actions__rating__number_gold {
  background: linear-gradient(165deg, #ffd25e 16.44%, #b59646 63.42%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.actions__rating__number_green {
  color: rgb(8, 160, 8);
}
.actions__rating__number_red {
  color: rgb(182, 17, 17);
}
.actions__rating-votes {
  font-size: 12px;
  color: grey;
}
.add__button {
  background-color: rgb(209, 209, 177);
  padding: 5px 12px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  transition: 0.2s;
}
.add__button:hover {
  transform: scale(1.1);
  transition: 0.2s;
}
.add__button:hover .heart {
  color: red;
  transition: 0.2s;
}
.heart {
  transition: 0.2s;
  font-size: 18px;
  padding-right: 5px;
}
.actions__evaluate {
  position: relative;
}
.v-rating {
  position: absolute;
  top: 32px;
  left: -200px;
}
.star {
  background-color: rgb(209, 209, 177);
  padding: 5px;
  border-radius: 17px;
  transition: 0.2s;
}
.actions__evaluate__button:hover {
  transform: scale(1.1);
  transition: 0.2s;
}
.actions__evaluate__button:hover .star {
  color: gold;
  transition: 0.2s;
}
</style>
