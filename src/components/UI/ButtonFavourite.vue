<!-- кнопка добавления в избранное -->
<template>
  <div>
    <v-btn class="button" @click="addToFavorite"> 
      <v-icon class="heart" :class="[{ heart_red: liked }]">mdi-heart</v-icon>
      В избранное
    </v-btn>
  </div>
</template>

<script>
import { useStorage } from "@/store/app.js";

export default {
  setup() {
    const storage = useStorage();
    return { storage };
  },
  name: "button-favourite",
  emits: ["liked", "disliked"],
  props: {
    liked: {
      type: [Boolean, Number],
      default: 0,
    },
    movie: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addToFavorite() {
      let flag = 0;
      //проверяем есть ли уже фильм с таким id в базе и добавлен ли был в избранное
      this.storage.favMovies.forEach((movieCurrent, index) => {
        if (movieCurrent.id == this.movie.id) {
          //если был лайк, то
          if (movieCurrent.liked == 1) {
            //если у фильма есть оценка, то только удаляем поле like
            if (movieCurrent.userRating != undefined) {
              delete movieCurrent.liked;
              this.$emit("disliked");
            }
            //если нет оценки, то удаляем чтобы не засорять память
            else {
              this.storage.favMovies.splice(index, 1);
              this.$emit("disliked");
            }
            //если была только оценка, а лайка не было, то добавляем в избранное
          } else {
            movieCurrent.liked = 1;
            this.$emit("liked");
          }
          flag = 1;
        }
      });
      //если в 'БД' не было фильма с таким id
      if (flag == 0) {
        this.storage.favMovies.push(this.movie);
        this.storage.favMovies[this.storage.favMovies.length - 1].liked = 1;
        this.$emit("liked");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  background-color: rgb(209, 209, 177);
  color: black;
  border-radius: 18px;
  transition: 0.2s;
}
.button:hover {
  transform: scale(1.1);
  transition: 0.2s;
}
.heart_red {
  color: red;
}
.button:hover .heart {
  color: red;
  transition: 0.2s;
}
.heart {
  transition: 0.2s;
  font-size: 18px;
  padding-right: 5px;
}
</style>
