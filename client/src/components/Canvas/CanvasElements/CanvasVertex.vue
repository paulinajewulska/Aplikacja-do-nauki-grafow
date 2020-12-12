<template>
  <v-circle
    :key="vertex.id"
    :config="{
      id: vertex.id,
      x: vertex.x,
      y: vertex.y,
      radius: radius,
      fill: '#9c9d9d',
      // draggable: true,
      stroke: 'black',
      strokeWidth: 2
    }"
    class="vertex"
    @click="removeClickedVertex"
  ></v-circle>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

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
    ...mapGetters("vertex", ["vertexesNumber", "removeVertexOption"])
  },
  methods: {
    ...mapActions("vertex", ["removeVertex"]),
    removeClickedVertex(e) {
      if (!this.removeVertexOption) return;
      this.removeVertex({ id: e.target.id() });
      // if (!this.vertexesNumber) {
      //   this.toggleRemoveVertexOption();
      // }
      // TODO: fix fix fix
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../style/main";

.vertex {
  z-index: 10;
}
</style>
