<template>
  <div class="actions__add-to-favourite">
    <button class="add__button" @click="addToFavorite">
      <span class="material-icons heart" :class="[{ heart_red: liked }]">
        favorite</span>
      В избранное
    </button>
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
      default:0
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
      this.storage.favMovies.forEach((movie, index) => {
        if (movie.id == this.movie.id) {
          if (movie.liked != undefined) {
            //если у фильма есть оценка, то только удаляем поле like
            if (movie.userRating != undefined) {
              delete movie.liked;
              this.$emit("disliked");
            }
            //если нет оценки, то удаляем чтобы не засорять память
            else {
              this.storage.favMovies.splice(index, 1);
              this.$emit("disliked");
            }
            //если была только оценка то добавляем в избранное
          } else {
            movie.liked = 1;
            this.$emit("liked");
          }
          flag = 1;
        }
      });
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
.heart_red {
  color: red;
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
</style>
