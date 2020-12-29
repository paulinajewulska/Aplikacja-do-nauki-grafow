<template>
  <div>
    <v-circle
      :key="vertex.id"
      :config="{
        id: vertex.id,
        x: vertex.x,
        y: vertex.y,
        radius: radius,
        fill: '#aff4f9',
        shadowColor: '#aff4f9',
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
    ...mapGetters(["selectVertexAvailable"]),
    ...mapGetters("vertex", ["vertexesNumber", "removeVertexOption"])
  },
  methods: {
    ...mapMutations(["saveSelectedVertex"]),
    ...mapActions("vertex", ["removeVertex"]),
    removeClickedVertex(e) {
      this.removeVertex({ id: e.target.id() });
      // if (!this.vertexesNumber) {
      //   this.toggleRemoveVertexOption();
      // }
      // TODO: fix fix fix
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
