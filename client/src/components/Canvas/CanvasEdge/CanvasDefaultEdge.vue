<template>
  <div v-if="this.edge.points">
    <v-line
      :key="edge.id"
      :config="{
        stroke: strokeColor,
        strokeWidth: 5,
        points: points
      }"
      @click="onEdgeClick()"
      @touchstart="onEdgeClick"
    />
    <v-text
      :config="{
        text: this.isWeighted ? `(${edge.id} | ${edge.weight})` : `${edge.id}`,
        x: edgeCenter.x - 4,
        y: edgeCenter.y - 3,
        fill: 'black',
        fontSize: 10
      }"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "CanvasDefault",
  props: {
    edge: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(["isWeighted"]),
    ...mapGetters("edge", [
      "removeEdgeOption",
      "addWeightToEdgeOption",
      "selectedEdge"
    ]),
    points() {
      return [
        this.edge.points.start.x,
        this.edge.points.start.y,
        this.edge.points.end.x,
        this.edge.points.end.y
      ];
    },
    strokeColor() {
      return this.isWeighted && this.selectedEdge === this.edge.id
        ? "#e3c7ff"
        : "#ffe168";
    },
    edgeCenter() {
      return {
        x: (this.edge.points.start.x + this.edge.points.end.x) / 2,
        y: (this.edge.points.start.y + this.edge.points.end.y) / 2
      };
    }
  },
  methods: {
    ...mapMutations("edge", ["setSelectedEdge"]),
    ...mapActions("edge", ["removeEdge"]),
    onEdgeClick() {
      if (this.removeEdgeOption) {
        this.removeEdge({ id: this.edge.id });
      } else if (this.addWeightToEdgeOption) {
        this.setSelectedEdge(this.edge.id);
      }
    }
  }
};
</script>
