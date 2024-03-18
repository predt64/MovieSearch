<!-- отображение и выбор рейтинга -->
<template>
  <div class="evaluation" v-if="modelValue == 0">
    <!-- .stop чтобы прекратить всплытие события в компоненте MovieItem show=0,
    т.к. без этого панелька со звездочками не откроется -->
    <v-btn
      class="button" 
      @click.stop="changeShow" 
      title="Поставить оценку"
    >
      <!-- иконка звезды -->
      <v-icon class="icon icon--star">mdi-star</v-icon>
    </v-btn>
    <div class="stars">
      <v-rating
        v-if="show == 1"
        :model-value="modelValue"
        @update:model-value="updateRating"
        class="stars__items"
        half-increments
        hover
      ></v-rating>
    </div>
  </div>
  <!-- отображает поставленный рейтинг и дает возможность его удалить -->
  <div class="cancel-evaluation" v-else>
    <v-btn
      class="button"
      title="Удалить поставленную оценку"
      @click="deleteRating"
    >
      <div class="cancel-evaluation__rating icon">
        {{ modelValue * 2 }}
      </div>
      <span class="icon--cross material-icons icon">close</span>
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
  name: "my-rating",
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
    show: {
      type: Boolean,
      required: true,
    },
    movie: {
      type: Object,
      required: true,
    },
  },
  emits: ["update:modelValue", "updateRating", "deleteRating", "changeShow"],
  methods: {
    //удаление рейтинга. ищем в массиве с избранными фильмами id соответствующий текущему фильму
    //и удаляем его, обновляем modelValue
    deleteRating() {
      this.storage.favMovies.forEach((el, index) => {
        if (el.id == this.movie.id) {
          if (el.liked == 1) {
            delete el.userRating;
          } else {
            this.storage.favMovies.splice(index, 1);
          }
        }
      });
      this.$emit("update:modelValue", 0);
    },
    changeShow() {
      this.$emit("changeShow");
    },
    updateRating(event) {
      this.$emit("update:modelValue", event);
    },
  },
  watch: {
    //следим за изменением рейтинга
    modelValue() {
      if (this.modelValue != 0) {
        let flag = 0;
        //если в БД уже есть фильм с таким id и текущий рейтинг !=0 то
        //перезаписываем существующий рейтинг
        this.storage.favMovies.forEach((el) => {
          if (el.id == this.movie.id) {
            el.userRating = this.modelValue;
            flag = 1;
          }
        });
        //если фильма с таким id нет и рейтинг != 0 то добавляем новый фильм в БД
        //с полем рейтинг и соответстующим значением
        if (flag == 0) {
          this.storage.favMovies.push(this.movie);
          this.storage.favMovies[this.storage.favMovies.length - 1].userRating =
            this.modelValue;
        }
        //если рейтинг = 0 (он удален засчет нажатия на крестик), то этот случай
        //обрабатывается в deleteRating
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.evaluation {
  position: relative;
}
.stars__items {
  position: absolute;
  top: 35px;
  left: -185px;
}
.icon {
  font-size: 22px;
  transition: 0.2s;
}

.icon--cross::before {
  transition: 0.2s;
}
.icon--cross:hover::before {
  transition: 0.2s;
}
.cancel-evaluation__rating {
  color: #19b467;
  font-weight: 700;
}
.button{
  background-color: rgb(209, 209, 177);
  border-radius: 17px;
  transition: .2s;
}
.button:hover {
  transform: scale(1.3);
  transition: 0.2s;
}
.icon--star{
  color: black ;
}
.button:hover .icon--star {
  color: rgb(255, 231, 92);
  transition: 0.2s;
}
.icon--cross {
  display: none;
}
.button:hover .cancel-evaluation__rating {
  display: none;
}
.button:hover .icon--cross {
  display: block;
  color: red;
}
</style>
