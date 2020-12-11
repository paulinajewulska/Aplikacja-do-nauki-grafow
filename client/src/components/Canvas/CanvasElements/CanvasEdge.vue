<template>
  <v-line
    :key="edge.id"
    :config="{
      stroke: 'black',
      points: points
    }"
  />
</template>

<script>
export default {
  name: "CanvasEdge",
  props: {
    edge: {
      type: Object,
      required: true
    }
  },
  computed: {
    points() {
      return [
        this.edge.start.x,
        this.edge.start.y,
        this.edge.end.x,
        this.edge.end.y
      ];
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
