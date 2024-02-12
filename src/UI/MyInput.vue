<template>
  <div class="search__box">
    <span class="icon" @click="search"><i class="fa fa-search"></i></span>
    <input
      :value="modelValue"
      @input="updateInput"
      @keyup.enter="search"
      :class="{
        input:true,
        input_contains:modelValue
      }"
      type="text"
      placeholder="Введите название фильма"
    />
  </div>
</template>

<script>
export default {
  emits: ["updateInput", "search","update:modelValue"],
  props: {
    modelValue: [String, Number],
  },

  methods: {
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
  transition: .15s;
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
  top: 27%;
  margin-left: 17px;
  z-index: 1;
  color: #99a5b0;
  cursor: pointer;
}
.input:focus, .input:active {
  outline: none;
  background: rgb(255, 255, 255, 0.7);
  transition: .15s;
}
.input:focus::placeholder, .input:active::placeholder{
  color: transparent;
  transition: .15s;
}
.input_contains{
  background: rgba(255, 255, 255, 0.7);
}
</style>
