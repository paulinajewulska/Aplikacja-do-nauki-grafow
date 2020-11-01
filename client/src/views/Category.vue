<template>
  <div>
    <app-navigation></app-navigation>
    <app-boards></app-boards>
  </div>
</template>

<script>
const Navigation = () => import("../components/Navigation");
const Boards = () => import("../components/LessonsList");

export default {
  name: "Category",
  components: {
    AppNavigation: Navigation,
    AppBoards: Boards
  }
};
</script>

<style scoped></style>
