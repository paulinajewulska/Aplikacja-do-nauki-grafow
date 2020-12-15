<template>
  <div>
    <v-line
      :config="{
        points: points,
        tension: 0.5,
        stroke: 'black'
      }"
    />
    <v-shape
      :config="{
        sceneFunc: function(context) {
          context.beginPath();

          context.translate(points[0], points[1]);
          context.rotate(angle);
          context.beginPath();
          context.moveTo(0, 0);
          context.moveTo(6, -2);
          context.lineTo(0, 0);
          context.lineTo(6, 2);
          context.closePath();
          context.fillStrokeShape(this);
        },
        stroke: 'black',
        strokeWidth: 4
      }"
    />
  </div>
</template>

<script>
export default {
  name: "CanvasDirectedEdge",
  data() {
    return {
      size: 10
    };
  },
  props: {
    edge: {
      type: Object,
      required: true
    }
  },
  computed: {
    points() {
      return [
        this.edge.points.start.x,
        this.edge.points.start.y,
        this.edge.points.end.x,
        this.edge.points.end.y
      ];
    },
    angle() {
      const dx = this.points[2] - this.points[0];
      const dy = this.points[3] - this.points[1];
      return Math.atan2(dy, dx);
    }
  }
};
</script>
