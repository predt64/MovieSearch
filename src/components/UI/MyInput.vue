<template>
  <div class="search__box">
    <!-- очень долго не мог разобраться, как перерендерить содержимое инпута в 
        дочернем компоненте из родительского. Само значение изменить было легко,
        но на то, чтобы сделать так, чтобы при этом еще отображаемое содержимое перерисовывлось,
        понадобилось много времени(старое значение продолжало отображаться на странице). В итоге
        нашел такое решение, с передачей пропсом желаемого перерисовываемого значения и биндом его 
        к input в качестве value -->
    <v-card class="mx-auto" variant="outlined" color="transparent" max-width="500">
      <v-card-text>
        <v-text-field
          :value="value"
          :loading="loading"
          :modelValue="modelValue"
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
        >
        </v-text-field>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "my-input",
  emits: ["updateInput", "search", "update:modelValue"],
  props: {
    modelValue: [String, Number],
    value: [String, Number],
    loading: [Boolean],
  },

  methods: {
    //если кликнули на лупу или нажали enter начинаем поиск фильма
    search() {
      this.$emit("search");
    },
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.v-card-text{
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
