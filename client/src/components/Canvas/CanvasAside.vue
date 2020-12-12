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
    <!--    <button type="button" class="btn my-2 btn-light" @click="deleteAll">-->
    <!--      Usuń wszystko-->
    <!--    </button>-->
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "CanvasAside",
  computed: {
    ...mapGetters("vertex", ["addVertexOption", "removeVertexOption"]),
    ...mapGetters("edge", ["addEdgeOption", "removeEdgeOption"])
  },
  methods: {
    ...mapMutations("vertex", [
      "toggleAddVertexOption",
      "toggleRemoveVertexOption"
    ]),
    ...mapMutations("edge", ["toggleAddEdgeOption", "toggleRemoveEdgeOption"])
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
