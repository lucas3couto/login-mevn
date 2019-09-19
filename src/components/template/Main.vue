<template>
  <div class="main">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'Main',
  components: {
  
  }
}
</script>

<style>
  .main{
    grid-area: main;
    padding: 20px;
  }
</style>
