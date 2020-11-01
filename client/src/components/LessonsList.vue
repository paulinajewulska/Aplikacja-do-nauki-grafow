<template>
  <div class="lessons-list">
    <div class="lessons-list__wrapper" v-if="lessons">
      <div v-for="lesson of lessons" :key="lesson.id">
        <app-lesson :name="lesson.name" :url="lesson.url" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Lesson from "./Lesson";

export default {
  name: "Boards",
  data() {
    return {
      error: null,
      loading: false
    };
  },
  computed: {
    ...mapGetters({ lessons: "getLessonsList" })
  },
  methods: {
    ...mapActions(["loadLessonsList"]),
    fetchData() {
      this.error = null;
      this.loading = true;
      try {
        this.loadLessonsList({ category: this.$route.params.category });
      } catch (err) {
        this.error = err.toString();
      } finally {
        this.loading = false;
      }
    }
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData"
  },
  components: {
    AppLesson: Lesson
  }
};
</script>

<style lang="scss" scoped>
@import "../style/main";

.lessons-list {
  @extend .left-wrapper;

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    @include media-breakpoint-up(lg) {
      position: absolute;
      top: 0.5rem;
      left: 0.5rem;
      align-content: flex-start;
      align-items: flex-start;
      justify-content: flex-start;
      width: calc(80vw - 1rem);
      height: calc(100vh - 1rem);
      border-radius: $border-radius;
      background-color: $pink;
    }
  }
}
</style>
