<template>
  <v-circle
    :key="vertex.id"
    :config="{
      id: vertex.id,
      x: vertex.x,
      y: vertex.y,
      radius: radius,
      fill: '#9c9d9d',
      draggable: true,
      stroke: 'black',
      strokeWidth: 2
    }"
  ></v-circle>
</template>

<script>
export default {
  name: "CanvasVertex",
  data() {
    return {
      radius: 23,
      dragItemId: null
    };
  },
  props: {
    vertex: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped></style>
