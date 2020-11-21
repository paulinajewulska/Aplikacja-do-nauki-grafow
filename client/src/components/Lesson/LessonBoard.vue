<template>
  <div class="lesson-board">
    <app-lesson-tabs></app-lesson-tabs>
    <!-- TODO: add canvas clue -->
    <app-canvas></app-canvas>
  </div>
</template>

<script>
import LessonTabs from "@/components/Lesson/LessonTabs";
import Canvas from "@/components/Canvas/Canvas";

export default {
  name: "LessonBoard",
  components: {
    AppLessonTabs: LessonTabs,
    AppCanvas: Canvas
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/main";

.lesson-board {
  @extend .board;
}
</style>
