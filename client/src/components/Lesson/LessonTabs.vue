<template>
  <div class="lesson">
    <b-tabs v-if="lesson" content-class="mt-3" justified>
      <b-tab title="Opis" active>
        <p>{{ lesson.description }}</p>
      </b-tab>
      <b-tab title="Pseudokod"
        ><p>{{ lesson.pseudocode }}</p></b-tab
      >
    </b-tabs>
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
  @include shadow($gray);
  width: 100%;
  margin: $margin-mobile 0;
  border: 1px solid $gray;
  // TODO: fix border radius in original tabs
  border-radius: $border-radius;
}

@include media-breakpoint-up(lg) {
  .lesson {
    width: 30%;
    height: calc(100vh - 2rem);
    margin: 0;
  }
}
</style>
