<template>
  <v-select
    placeholder="По умолчанию"
    :model-value="modelValue"
    @update:model-value="changeOption"
    :items="options"
    class="select-component"
    bg-color="rgb(231, 231, 204)"
  >
  </v-select>
</template>

<script>
export default {
  name: "my-select",
  emits: ["changeOption","update:model-value"],
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    changeOption(event) {
      this.$emit("update:model-value", event);
    },
  },
};
</script>

<style lang="scss" scoped>
.select-component {
  width: 240px;
}
</style>
