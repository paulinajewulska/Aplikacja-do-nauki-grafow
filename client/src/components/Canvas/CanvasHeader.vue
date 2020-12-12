<template>
  <div class="canvas-header">
    <button
      type="button"
      class="btn mx-2"
      :class="[isDirected ? 'btn-primary' : 'btn-light']"
      @click="toggleIsDirected"
    >
      graf skierowany
    </button>
    <button
      type="button"
      class="btn btn-primary"
      :class="[isWeighted ? 'btn-primary' : 'btn-light']"
      @click="toggleIsWeighted"
    >
      graf wagowy
    </button>
    <button type="button" class="btn btn-primary mx-2" @click="loadSolution">
      wynik
    </button>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "CanvasHeader",
  computed: {
    ...mapGetters(["isDirected", "isWeighted"])
  },
  methods: {
    ...mapMutations(["toggleIsDirected", "toggleIsWeighted"]),
    ...mapActions(["loadSolution"])
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/main.scss";

.canvas-header {
  @include grid(2, 3, 1, 2);
  display: flex;
  align-items: center;

  .btn {
    height: fit-content;
    font-size: 0.85rem;
  }
}
</style>
