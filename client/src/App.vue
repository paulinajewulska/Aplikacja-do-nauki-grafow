<template>
  <div>
    <app-navigation></app-navigation>
    <router-view />
  </div>
</template>

<script>
const Navigation = () => import("@/components/Navigation/Navigation");

export default {
  components: {
    AppNavigation: Navigation
  }
};
</script>

<style lang="scss">
@import "./style/main.scss";

body {
  background-color: $light;
}
</style>
