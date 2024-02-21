<template>
  <v-select
    placeholder="По умолчанию"
    :model-value="modelValue"
    @update:model-value="changeOption"
    :items="options"
    class="select"
    bg-color="rgb(231, 231, 204)"
  >
  </v-select>
</template>

<script>
export default {
  name: "my-select",
  emits: ["changeOption"],
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    changeOption(event) {
      this.$emit("update:modelValue", event);
    },
  },
};
</script>

<style lang="scss" scoped>
.select {
  width: 240px;
}
</style>
