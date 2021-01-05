<template>
  <div>
    <h2 class="category__header">{{ currentTitle }}</h2>
    <app-category-board></app-category-board>
  </div>
</template>

<script>
const CategoryBoard = () => import("@/components/Category/CategoryBoard");
import { mapGetters } from "vuex";

export default {
  name: "Category",
  components: {
    AppCategoryBoard: CategoryBoard
  },
  computed: {
    ...mapGetters(["navigationList"]),
    currentTitle() {
      const titleObj = this.navigationList.find(
        u => `/${u.url}` === this.$route.path
      );
      return titleObj?.name || " ";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/main";

.category__header {
  @extend .board;
  margin-top: 3rem;
  width: fit-content;
  @include media-breakpoint-up(lg) {
    margin-left: 1.5rem;
  }
}
</style>
