<template>
  <div id="app">
    <div class="wrapper">
      <CategoryFilter :filterName="'categories'" />
    </div>
  </div>
</template>

<script>
import CategoryFilter from "@/components/CategoryFilter.vue";

export default {
  name: "app",
  components: {
    CategoryFilter,
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Helvetica, Arial, sans-serif;
}

#app {
  height: 100vh;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 24px;
}
</style>
