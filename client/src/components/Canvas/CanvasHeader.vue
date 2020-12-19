<template>
  <div class="canvas-header">
    <button
      type="button"
      class="btn mx-2"
      :class="[isDirected ? 'btn-primary' : 'btn-light']"
      @click="toggleIsDirectedAll"
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
    <button
      v-if="requireSelectedVertex"
      type="button"
      class="btn btn-primary"
      :class="[selectVertexAvailable ? 'btn-primary' : 'btn-light']"
      @click="toggleSelectVertexAvailable"
    >
      Wybierz wierzcholek
    </button>
    <button type="button" class="btn btn-primary mx-2" @click="loadSolution">
      wynik
    </button>
    <form class="canvas-weight-input" v-if="isWeighted">
      <b-form-input
        v-model="weight"
        placeholder="Enter weight      "
      ></b-form-input>
      <button type="button" class="btn btn-primary" @click="setEdgeWeight">
        Ustaw wagę
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "CanvasHeader",
  data() {
    return {
      weight: 1
    };
  },
  computed: {
    ...mapGetters([
      "isDirected",
      "isWeighted",
      "requireSelectedVertex",
      "selectVertexAvailable"
    ])
  },
  methods: {
    ...mapMutations([
      "toggleIsDirected",
      "toggleIsWeighted",
      "toggleSelectVertexAvailable"
    ]),
    ...mapActions(["loadSolution", "deleteAll"]),
    ...mapActions("edge", ["updateEdge"]),
    toggleIsDirectedAll() {
      this.toggleIsDirected();
      this.deleteAll();
    },
    setEdgeWeight() {
      this.updateEdge(this.weight);
    }
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

.canvas-weight-input {
  display: flex;
  align-items: center;

  input {
    margin: auto 0.5rem;
  }
}
</style>
