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
import { mapActions } from "vuex";

export default {
  name: "LessonBoard",
  components: {
    AppLessonTabs: LessonTabs,
    AppCanvas: Canvas
  },
  methods: {
    ...mapActions(["setCurrentRoute"]),
    fetchData() {
      try {
        this.setCurrentRoute({
          category: this.$route.params.category,
          lesson: this.$route.params.lesson
        });
      } catch (err) {
        console.log(err.toString());
      }
    }
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData"
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/main";

.lesson-board {
  @extend .board;
  padding: 0;
}
</style>
