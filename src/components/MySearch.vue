<template>
  <div class="search">
    <div class="title">
      <slot></slot>
    </div>
    <div class="search__input">
      <div class="search__box">
    <!-- очень долго не мог разобраться, как перерендерить содержимое инпута в 
        дочернем компоненте из родительского. Само значение изменить было легко,
        но на то, чтобы сделать так, чтобы при этом еще отображаемое содержимое перерисовывлось,
        понадобилось много времени(старое значение продолжало отображаться на странице). В итоге
        нашел такое решение, с передачей пропсом желаемого перерисовываемого значения и биндом его 
        к input в качестве value -->
    <v-card
      class="mx-auto"
      variant="outlined"
      color="transparent"
      max-width="500"
    >
      <v-card-text>
        <v-text-field
          :value="modelValue"
          :loading="loading"
          :model-value="modelValue"
          append-inner-icon="mdi-magnify"
          density="compact"
          label="Введите название фильма"
          variant="solo"
          hide-deatails
          single-line
          @update:modelValue="updateInput"
          @click:append-inner="search"
          @keyup.enter="search"
          type="text"
          class="input-field"
        />
      </v-card-text>
    </v-card>
  </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["updateInput", "search", "update:modelValue"],
  props: {
    modelValue: [String, Number],
  //скрывает панель поиска, если находится на странице с избранным т.к. там нет такой функции
    disableSearch: {
      type: Number,
      default: 0,
    },
    loading:{
      type: Boolean,
      required: true,
    }
  },
  methods: {
    search() {
      this.$emit("search");
    },
    updateInput(event) {
      this.$emit("update:modelValue", event);
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8) 0,
      rgba(0, 0, 0, 0.5) 60%,
      rgba(0, 0, 0, 0.7) 100%
    ),
    url(@/img/bgimage.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding-top: 120px;
  padding-bottom: 105px;
  min-height: 475px;
}
.search__input {
  text-align: center;
  margin-top: 80px;
}
.title {
  text-align: center;
  color: white;
}


.v-card-text {
  background-color: transparent;
}
.search__box {
  white-space: nowrap;
  position: relative;
  margin: 0 auto;
}
.input-field {
  width: 450px;
}
</style>
