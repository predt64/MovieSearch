<template>
  <div class="search__box">
    <span class="icon" @click="search"><i class="fa fa-search"></i></span>
    <!-- очень долго не мог разобраться, как перерендерить содержимое инпута в 
        дочернем компоненте из родительского. Само значение изменить было легко,
        но на то, чтобы сделать так, чтобы при этом еще отображаемое содержимое перерисовывлось,
        понадобилось много времени(старое значение продолжало отображаться на странице). В итоге
        нашел такое решение, с передачей пропсом желаемого перерисовываемого значения и биндом его 
        к input в качестве value -->
    <input
      :value="value"
      :model-value="modelValue"
      @input="updateInput"
      @keyup.enter="search"
      :class="{
        input: true,
        input_contains: modelValue,
      }"
      type="text"
      placeholder="Введите название фильма"
    />
  </div>
</template>

<script>
export default {
  name: "my-input",
  emits: ["updateInput", "search", "update:modelValue"],
  props: {
    modelValue: [String, Number],
    value: [String, Number],
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
.input {
  background-color: transparent;
  border: 3px double rgb(9, 231, 231);
  border-radius: 30px;
  width: 520px;
  height: 50px;
  padding: 5px 15px;
  padding-left: 45px;
  transition: 0.15s;
}
.input:focus-visible {
  outline: none !important;
}
::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: rgb(255, 255, 255);
}
.search__box {
  white-space: nowrap;
  position: relative;
}
.icon {
  position: absolute;
  top: 25%;
  margin-left: 17px;
  z-index: 1;
  color: #99a5b0;
  cursor: pointer;
}
.input:focus,
.input:active {
  outline: none;
  background: rgb(255, 255, 255, 0.7);
  transition: 0.15s;
}
.input:focus::placeholder,
.input:active::placeholder {
  color: transparent;
  transition: 0.15s;
}
.input_contains {
  background: rgba(255, 255, 255, 0.7);
}
</style>
