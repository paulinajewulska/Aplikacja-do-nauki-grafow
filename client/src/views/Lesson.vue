<template>
  <div>
    <!-- TODO: add title -->
    <app-lesson-board></app-lesson-board>
  </div>
</template>

<script>
const LessonBoard = () => import("@/components/Lesson/LessonBoard");

export default {
  name: "Category",
  components: {
    AppLessonBoard: LessonBoard
  }
};
</script>
