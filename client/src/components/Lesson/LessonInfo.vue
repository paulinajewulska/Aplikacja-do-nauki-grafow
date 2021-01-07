<template>
  <div class="lesson">
    <!--    <h2 class="lesson__title"></h2>-->
    <div v-if="lesson.description" class="lesson__card">
      {{ lesson.description }}
    </div>
    <div v-if="lesson.pseudocode" class="lesson__card">
      {{ lesson.pseudocode }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "LessonTabs",
  computed: {
    ...mapGetters({ lesson: "lesson" })
  },
  methods: {
    ...mapActions(["loadLesson"]),
    fetchData() {
      try {
        this.loadLesson({
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

.lesson {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: $margin-mobile 0;

  &__card {
    @include shadow;
    margin: 0 0 1rem;
    border-radius: $border-radius;
    padding: 1rem;
    background-color: $white;
  }
}

@include media-breakpoint-up(lg) {
  .lesson {
    width: 30%;
    height: calc(100vh - 8rem);
    margin: 3rem 0 0;
  }
}
</style>
