<template>
  <v-line
    :key="edge.id"
    :config="{
      stroke: 'black',
      strokeWidth: 5,
      points: points
    }"
    @click="removeClickedEdge"
  />
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CanvasEdge",
  props: {
    edge: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters("edge", ["removeEdgeOption"]),
    points() {
      return [
        this.edge.start.x,
        this.edge.start.y,
        this.edge.end.x,
        this.edge.end.y
      ];
    }
  },
  methods: {
    ...mapActions("edge", ["removeEdge"]),
    removeClickedEdge() {
      if (!this.removeEdgeOption) return;
      this.removeEdge({ id: this.edge.id });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../style/main";

.vertex {
  z-index: 5;
}
</style>
