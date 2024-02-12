<template>
  <div class="upper-wrapper">
    <div class="wrapper">
      
      <div class="img-info-wrapper">
        <div class="poster">
          <img
            v-if="this.movie.poster.previewUrl!==null"
            :src="this.movie.poster.previewUrl"
            alt="logo"
            class="poster__image"
          />
          <img
          v-else
          src="https://res.cloudinary.com/shop-consoles-ru/image/upload/c_scale,w_1000/v1568607967/images/no_image_avalible_jwqnxa.jpg" 
          alt="logo"
          class="poster__image">
        </div>

        <div class="info">
          <p class="info__name">
            {{ this.movie.name }}
          </p>
          <div class="info__subtitle__wrapper">

            <p class="info__subtitle">
              <span v-if="this.movie.enName">
              {{ this.movie.enName }}, 
            </span>
            <span v-else>
              —,
            </span>

            <span v-if="this.movie.year">
              {{ this.movie.year }}, 
            </span>
            <span v-else>
              —,
            </span>

            <span v-if="movie.movieLength">
              {{this.movie.movieLength}} мин.
            </span>
            <span v-else>
              —
            </span>
            </p>

            <p class="info__sub-subtitle">

              <span class="info__sub-subtitlle__country" v-if="movie.countries.length>0">{{movie.countries[0].name}} • </span>
              <span v-else>
              —
              </span>
              <span class="info__sub-subtitlle__genre"  v-if="movie.genres.length>0">{{ movie.genres[0].name}}</span>
              <span v-else>
              —
              </span>

            </p>
          </div>
        </div>
  </div>

      <div class="actions">

        <div class="actions__rating">
          <span class="actions__rating-number" v-if="movie.rating.kp>0" >{{ movie.rating.kp.toFixed(1)}};</span>
          <span v-else>
              —
          </span>

          <span class="actions__rating-votes" v-if="movie.votes.kp>0">{{ movie.votes.kp }}</span>
          <span v-else>
              —
          </span>
        </div>

        <div class="actions__add-to-favourite">
          <button class="add__button">
            В избранное
          </button>
        </div>

        <div class="actions__evaluate">
          *
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  methods:{
  }
};
</script>

<style lang="scss" scoped>
.upper-wrapper{
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
  transition: .15s;
}
.wrapper:hover{
  border-radius: 20px;
  background-color: rgb(221, 221, 194);
  transition: .15s;
  cursor: pointer;
}
.img-info-wrapper{
  display: flex;
}
.poster__image {
  max-width: 140px;
}
.info{
  padding-top: 6px;
  padding-left: 10px;
}
.info__subtitle__wrapper {
  color: rgb(69, 67, 67);
  font-weight: 300;
}
.info__subtitle{
  padding-bottom: 5px;
}
.info__name{
  font-size: 20px;
  font-weight: 600;
  padding-bottom: 12px;
}
.actions{
  padding: 6px 10px 0 0;
  display: flex;
  flex-direction: row;
  gap: 20px;
}
.actions__rating-number{
  font-weight: 800;
}
.actions__rating-votes{
  font-size: 13px;
}

</style>
