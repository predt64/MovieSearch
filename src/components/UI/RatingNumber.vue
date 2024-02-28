<!-- рейтинг и количество голосов на кинопоиске -->

<template>
  <div class="rating">
    <span
      :class="{
        rating__number: true,
        rating__number_gold: rating.toFixed(1) >= 8,
        rating__number_green: rating.toFixed(1) >= 7 && rating.toFixed(1) < 8,
        rating__number_red: rating.toFixed(1) < 6,
      }"
      >{{ rating.toFixed(1) }}</span
    >

    <span class="raing__votes">{{ numberWithSpaces(votes) }}</span>
  </div>
</template>

<script>
export default {
  name: "rating-number",
  props: {
    rating: {
      type: Number,
      requred: true,
    },
    votes: {
      type: Number,
      requred: true,
    },
  },
  methods: {
    //делит число на разряды чтобы было легче воспринимать число
    numberWithSpaces(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
  },
  
};
</script>

<style lang="scss" scoped>
.rating {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.rating__number {
  font-weight: 800;
  margin-right: 5px;
  font-size: 21px;

  &_gold {
    background: linear-gradient(165deg, #ffd25e 16.44%, #b59646 63.42%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &_green {
    color: rgb(8, 160, 8);
  }
  &_red {
    color: rgb(182, 17, 17);
  }
}
.raing__votes {
  font-size: 12px;
  color: grey;
}
</style>
