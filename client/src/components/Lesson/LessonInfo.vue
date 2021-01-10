<template>
  <div class="lesson">
    <div v-if="lesson.description" class="lesson__card">
      {{ desc }}
    </div>
    <div v-if="lesson.pseudocode" class="lesson__card break-spaces">
      {{ less }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "LessonTabs",
  computed: {
    ...mapGetters({ lesson: "lesson" }),
    desc() {
      return this.lesson.description.replaceAll("\\n", "\n");
    },
    less() {
      return this.lesson.pseudocode.replaceAll("\\t", "\t");
    }
  },
  methods: {
    ...mapActions(["loadLesson"]),
    fetchData() {
      try {
        this.loadLesson();
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
    font-size: 0.8rem;
    white-space: pre-line;
    height: calc((100vh - #{$margin-mobile * 2} - 1rem) / 2);
    overflow: scroll;
    overflow-x: auto;
  }
}

@include media-breakpoint-up(lg) {
  .lesson {
    width: 30%;
    height: calc(100vh - 8rem);
    margin: 3rem 0 0;
    &__card {
      font-size: 0.9rem;
    }
  }
}

.break-spaces {
  white-space: break-spaces;
}
</style>
