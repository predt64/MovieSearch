<template>
  <div class="search">
    <div class="search__title">
    
        <slot></slot>  
      
    </div>
    <div class="search__input">
      <my-input v-if="!disableSearch" :model-value="modelValue" @input="updateInput" @search="search" :value="modelValue"/>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["updateInput", "search", "update:modelValue"],
  props: {
    modelValue: [String, Number],
    disableSearch:{
      type:Number,
      default:0
    }
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
.search{
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
.search__title {
  text-align: center;
  color: white;
}
</style>
