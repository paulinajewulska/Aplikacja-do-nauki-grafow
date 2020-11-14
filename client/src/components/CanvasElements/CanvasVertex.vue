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
    @click="removeVertex"
  ></v-circle>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

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
  },
  computed: {
    ...mapGetters(["vertexNumber"])
  },
  methods: {
    ...mapMutations(["deleteVertex", "toggleDeleteVertexOption"]),
    removeVertex(e) {
      this.deleteVertex(e.target.id());
      if (!this.vertexNumber) {
        this.toggleDeleteVertexOption();
      }
    }
  }
};
</script>

<style scoped></style>
