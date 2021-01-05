<template>
  <div v-if="lessons" class="category-board">
    <app-category-card
      v-for="lesson of lessons"
      :key="lesson.id"
      :url="lesson.url"
      :title="lesson.name"
    ></app-category-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CategoryCard from "@/components/Category/CategoryCard";

export default {
  name: "CategoryBoard",
  computed: {
    ...mapGetters({ lessons: "getLessonsList" })
  },
  methods: {
    ...mapActions(["loadLessonsList"]),
    fetchData() {
      try {
        this.loadLessonsList({ category: this.$route.params.category });
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
  },
  components: {
    AppCategoryCard: CategoryCard
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/main";

.category-board {
  @extend .board;
  align-content: flex-start;
  top: 6rem;
}
</style>
