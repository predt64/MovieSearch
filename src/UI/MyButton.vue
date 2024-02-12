<template>
  <div>
    <button class="mybutton">
    <slot></slot>
    </button>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

.mybutton:hover{
  transition: 0.2s;
  color:black
}

</style>