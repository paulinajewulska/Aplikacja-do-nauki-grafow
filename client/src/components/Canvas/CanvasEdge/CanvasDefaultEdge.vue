<template>
  <div>
    <v-line
      :key="edge.id"
      :config="{
        stroke: '#ffd73c',
        strokeWidth: 5,
        points: points
      }"
      @click="onEdgeClick()"
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
    ...mapGetters("edge", ["removeEdgeOption", "addWeightToEdgeOption"]),
    points() {
      return [
        this.edge.points.start.x,
        this.edge.points.start.y,
        this.edge.points.end.x,
        this.edge.points.end.y
      ];
    },
    edgeCenter() {
      return {
        x: (this.edge.points.start.x + this.edge.points.end.x) / 2,
        y: (this.edge.points.start.y + this.edge.points.end.y) / 2
      };
    }
  },
  methods: {
    ...mapMutations("edge", ["selectedEdge"]),
    ...mapActions("edge", ["removeEdge"]),
    onEdgeClick() {
      if (this.removeEdgeOption) {
        this.removeEdge({ id: this.edge.id });
      } else if (this.addWeightToEdgeOption) {
        this.selectedEdge(this.edge.id);
      }
    }
  }
};
</script>
