<template>
  <div id="app">
    <home />
  </div>
</template>

<script>
import Home from "@/views/Home.vue";

export default {
  components: {
    Home,
  },
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html {
  overflow: hidden;
  background: #fafbff;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
</style>
