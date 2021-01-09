<template>
  <div ref="edge" v-if="this.edge.points">
    <v-line
      :key="edge.id"
      :config="{
        points: points,
        strokeWidth: 5,
        stroke: strokeColor
      }"
      @click="onEdgeClick"
      @touchstart="onEdgeClick"
    />
    <v-shape
      :config="{
        sceneFunc: function(context) {
          context.beginPath();
          context.translate(points[2], points[3]);
          context.rotate(angle + Math.PI);
          context.beginPath();
          context.moveTo(0, 0);
          context.moveTo(6, -2);
          context.lineTo(0, 0);
          context.lineTo(6, 2);
          context.closePath();
          context.fillStrokeShape(this);
        },
        stroke: strokeColor,
        strokeWidth: 4
      }"
      @click="onEdgeClick"
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
  name: "CanvasDirectedEdge",
  data() {
    return {
      size: 10,
      radius: 25,
      d: 5
    };
  },
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
      const x = this.edge.points.start.x - this.edge.points.end.x;
      const y = this.edge.points.start.y - this.edge.points.end.y;
      const z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
      const dz = this.radius + this.d;

      const dx = (x * dz) / z;
      const dy = (y * dz) / z;

      return [
        this.edge.points.start.x - dx,
        this.edge.points.start.y - dy,
        this.edge.points.end.x + dx,
        this.edge.points.end.y + dy
      ];
    },
    strokeColor() {
      return this.isWeighted && this.selectedEdge === this.edge.id
        ? "#e3c7ff"
        : "#ffe168";
    },
    angle() {
      const dx = this.points[2] - this.points[0];
      const dy = this.points[3] - this.points[1];
      return Math.atan2(dy, dx);
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
