<template>
  <div class="aside">
    <button
      type="button"
      class="btn my-2"
      :class="[addVertexOption ? 'btn-primary' : 'btn-light']"
      @click="toggleAddVertexOption"
    >
      Dodaj węzeł
    </button>
    <button
      type="button"
      class="btn my-2"
      :class="[removeVertexOption ? 'btn-primary' : 'btn-light']"
      @click="toggleRemoveVertexOption"
    >
      Usuń węzęł
    </button>
    <button
      type="button"
      class="btn my-2"
      :class="[addEdgeOption ? 'btn-primary' : 'btn-light']"
      @click="toggleAddEdgeOption"
    >
      Dodaj krawędź
    </button>
    <button
      type="button"
      class="btn my-2 "
      :class="[removeEdgeOption ? 'btn-primary' : 'btn-light']"
      @click="toggleRemoveEdgeOption"
    >
      Usuń krawędź
    </button>
    <button type="button" class="btn my-2 btn-light" @click="deleteAll">
      Usuń wszystko
    </button>
    <button
      v-if="isWeighted"
      type="button"
      class="btn my-2 "
      :class="[addWeightToEdgeOption ? 'btn-primary' : 'btn-light']"
      @click="toggleAddWeightToEdgeOption"
    >
      Dodaj wagę
    </button>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "CanvasAside",
  computed: {
    ...mapGetters(["isWeighted"]),
    ...mapGetters("vertex", ["addVertexOption", "removeVertexOption"]),
    ...mapGetters("edge", [
      "addEdgeOption",
      "removeEdgeOption",
      "addWeightToEdgeOption"
    ])
  },
  methods: {
    ...mapActions(["deleteAll"]),
    ...mapMutations("vertex", [
      "toggleAddVertexOption",
      "toggleRemoveVertexOption"
    ]),
    ...mapMutations("edge", [
      "toggleAddEdgeOption",
      "toggleRemoveEdgeOption",
      "toggleAddWeightToEdgeOption"
    ])
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/main.scss";

.aside {
  @include grid(1, 2, 2, 3);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
</style>
