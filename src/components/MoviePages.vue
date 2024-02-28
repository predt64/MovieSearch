<!-- блок с цифрами для пагинации -->
<template>
  <div class="pages__wrapper">
    <v-pagination
      :modelValue="modelValue"
      @update:modelValue="updatePage"
      :length="this.storage.totalPages"
      :total-visible="6"
      :color="color"
    ></v-pagination>
  </div>
</template>

<script>
import { useStorage } from "@/store/app.js";
export default {
  emits: ["updatePage", "update:modelValue"],
  props: {
    color: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Number,
    },
  },

  methods: {
    updatePage(event){
      this.$emit("update:modelValue", event);
    },
  },

  setup() {
    const storage = useStorage();
    return { storage };
  },
};
</script>

<style lang="scss" scoped>
.pages__wrapper {
  white-space: nowrap;
}
</style>
