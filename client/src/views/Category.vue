<template>
  <div>
    <app-navigation></app-navigation>
    <!-- TODO: add title -->
    <app-category-board></app-category-board>
  </div>
</template>

<script>
const Navigation = () => import("@/components/Navigation/Navigation");
const CategoryBoard = () => import("@/components/Category/CategoryBoard");

export default {
  name: "Category",
  components: {
    AppNavigation: Navigation,
    AppCategoryBoard: CategoryBoard
  }
};
</script>
