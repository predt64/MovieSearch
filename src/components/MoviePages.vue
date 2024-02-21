<template>
  <div class="pages__wrapper">
    <v-pagination
      v-model="this.storage.currentPage"
      :length="this.storage.totalPages"
      :total-visible="6"
      :color=color
    ></v-pagination>
  </div>
</template>

<script>
import { useStorage } from "@/store/app.js";
export default {
  props:{
    color:{
      type:String,
      required:true
    }
  },
  setup() {
    const storage = useStorage();
    return { storage };
  },
};
</script>

<style lang="scss" scoped>
.pages__wrapper{
  white-space:nowrap;
}

</style>
