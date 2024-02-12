<template>
  <div>
    {{ storage.getMovies() }}
  </div>
</template>

<script>
  import {useStorage} from '@/store/app.js';
  export default {
    setup() {
    const storage = useStorage()
    return { storage }                                      //добавление хранилища
  // },
  //   created:{
  //     async fetchMovies(){
  //       try{
        
  //       }
  //     }
    }

  }
</script>

<style lang="scss" scoped>

</style>