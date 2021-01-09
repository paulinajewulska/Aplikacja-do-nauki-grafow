<template>
  <div>
    <v-circle
      :key="vertex.id"
      :config="{
        id: vertex.id,
        x: vertex.x,
        y: vertex.y,
        radius: radius,
        fill: fillColor,
        shadowColor: fillColor,
        shadowBlur: 1,
        shadowOffset: { x: 1, y: 1 },
        shadowOpacity: 0.35
      }"
      class="vertex"
      @click="
        removeVertexOption
          ? removeClickedVertex($event)
          : selectVertexAvailable
          ? selectVertex($event)
          : {}
      "
      @touchstart="
        removeVertexOption
          ? removeClickedVertex($event)
          : selectVertexAvailable
          ? selectVertex($event)
          : {}
      "
    ></v-circle>
    <v-text
      :config="{
        text: vertex.id,
        x: vertex.x - 3,
        y: vertex.y - 4,
        fill: 'black',
        fontSize: 10
      }"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "CanvasVertex",
  data() {
    return {
      radius: 25,
      dragItemId: null
    };
  },
  props: {
    vertex: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      "selectVertexAvailable",
      "requireSelectedVertex",
      "selectedVertex"
    ]),
    ...mapGetters("vertex", ["vertexesNumber", "removeVertexOption"]),
    fillColor() {
      return this.requireSelectedVertex &&
        this.selectedVertex === this.vertex.id
        ? "#e3c7ff"
        : "#aff4f9";
    }
  },
  methods: {
    ...mapMutations(["saveSelectedVertex"]),
    ...mapActions("vertex", ["removeVertex"]),
    removeClickedVertex(e) {
      this.removeVertex({ id: e.target.id() });
    },
    selectVertex(e) {
      this.saveSelectedVertex(e.target.id());
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../style/main";

.vertex {
  @include shadow($blue);
}
</style>
