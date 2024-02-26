<template>
  <!-- почему то меня в ступор ввело, почему тут надо функцию со скобочками передавать, 
   мне всегда казалось что если функция без аргументов, то можно и без них, а тут
   результат другой. не до конца эту тему похоже понял  -->
  <div class="actions__evaluate" v-if="modelValue == 0">
    <button
      class="actions__evaluate__button"
      @click.stop="changeShow"
      title="Поставить оценку"
    >
      <span
        class="material-icons icon star"
        :class="[{ star_yellow: modelValue }]"
        >star</span
      >
    </button>
    <div class="actions__evaluate__bar_box">
      <v-rating
        v-if="show == 1"
        :model-value="modelValue"
        @update:model-value="updateRating"
        @click.stop
        class="actions__evaluate__bar"
        active-color="darkred"
        half-increments
        hover
      ></v-rating>
    </div>
  </div>
  <div class="actions__cancel-evaluation" v-else>
    <button
      class="actions__evaluate__button"
      title="Удалить поставленную оценку"
      @click="deleteRating"
    >
      <div class="actions__evaluate__button__rating icon">
        {{ modelValue * 2 }}
      </div>
      <span class="cross material-icons icon">close</span>
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
  name: "my-rating",
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
    show: {
      type: Boolean,
      required:true
    },
    id:{
      type:Number,
      required:true
    }
  },
  emits: ["update:modelValue", "updateRating", "deleteRating", "changeShow"],
  methods: {
    updateRating(event) {
      this.$emit("update:modelValue", event);
    },
    deleteRating() {
      this.storage.favMovies.forEach((el, index) => {
        if (el.id == this.id) {
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
  },
};
</script>

<style lang="scss" scoped>
.actions__evaluate {
  position: relative;
}
.v-rating {
  position: absolute;
  top: 32px;
  left: -200px;
}
.icon {
  background-color: rgb(209, 209, 177);
  padding: 5px;
  border-radius: 17px;
  transition: 0.2s;
}

.cross::before {
  transition: 0.2s;
}
.cross:hover::before {
  transition: 0.2s;
}
.cross:hover {
  color: red;
  transition: 0.2s;
}
.star_yellow {
  color: rgb(255, 231, 92);
}
.actions__evaluate__button__rating {
  width: 34px;
  height: 34px;
  color: #19b467;
  font-weight: 700;
}
.actions__evaluate__button:hover {
  transform: scale(1.1);
  transition: 0.2s;
}
.actions__evaluate__button:hover .star {
  color: rgb(255, 231, 92);
  transition: 0.2s;
}
.cross {
  display: none;
}
.actions__evaluate__button:hover .actions__evaluate__button__rating {
  display: none;
}
.actions__evaluate__button:hover .cross {
  display: block;
}
</style>
