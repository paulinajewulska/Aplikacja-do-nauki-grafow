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
      :class="[deleteVertexOption ? 'btn-primary' : 'btn-light']"
      @click="toggleDeleteVertexOption"
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
      @click="toggleDeleteEdgeOption"
    >
      Usuń krawędź
    </button>
    <button type="button" class="btn my-2 btn-light" @click="deleteAll">
      Usuń wszystko
    </button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

// TODO: refactor :(
export default {
  name: "CanvasAside",
  computed: {
    ...mapGetters(["addVertexOption", "deleteVertexOption"]),
    ...mapGetters("edge", ["addEdgeOption", "removeEdgeOption"])
  },
  methods: {
    ...mapMutations([
      "toggleAddVertexOption",
      "deleteAll",
      "toggleDeleteVertexOption"
    ]),
    ...mapMutations("edge", ["toggleAddEdgeOption", "toggleDeleteEdgeOption"])
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
