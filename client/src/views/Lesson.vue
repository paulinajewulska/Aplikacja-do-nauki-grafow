<template>
  <div>
    <app-navigation></app-navigation>
    <app-lesson-board></app-lesson-board>
  </div>
</template>

<script>
const Navigation = () => import("@/components/Navigation/Navigation");
const LessonBoard = () => import("@/components/LessonBoard");

export default {
  name: "Category",
  components: {
    AppNavigation: Navigation,
    AppLessonBoard: LessonBoard
  }
};
</script>

<style scoped></style>
