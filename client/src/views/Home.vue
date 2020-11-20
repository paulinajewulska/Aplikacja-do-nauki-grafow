<template>
  <div>
    <app-navigation></app-navigation>
  </div>
</template>

<script>
const Navigation = () => import("@/components/Navigation/Navigation");

export default {
  name: "Home",
  components: {
    AppNavigation: Navigation
  }
};
</script>

<style lang="scss" scoped></style>
