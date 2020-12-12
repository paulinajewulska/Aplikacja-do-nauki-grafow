<template>
  <div class="canvas-board">
    <v-stage
      ref="stage"
      :config="configKonva"
      @click="addVertexOption ? addNewVertex($event) : {}"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
      @mousemove="handleMouseMove"
    >
      <v-layer>
        <app-canvas-vertex v-for="v of vertexes" :vertex="v" :key="v.id" />
        <app-canvas-edge v-for="e of edges" :key="`edge-${e.id}`" :edge="e" />
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
import Konva from "konva";
import { mapGetters, mapActions } from "vuex";
import CanvasVertex from "@/components/Canvas/CanvasElements/CanvasVertex";
import CanvasEdge from "@/components/Canvas/CanvasElements/CanvasEdge";

export default {
  name: "CanvasBoard",
  data() {
    return {
      configKonva: {
        width: 400,
        height: 400
      },
      canDrawLine: false,
      currentEdge: {}
    };
  },
  computed: {
    ...mapGetters("vertex", [
      "vertexes",
      "addVertexOption",
      "availableVertexId"
    ]),
    ...mapGetters("edge", ["edges", "addEdgeOption", "availableEdgeId"])
  },
  components: {
    AppCanvasVertex: CanvasVertex,
    AppCanvasEdge: CanvasEdge
  },
  methods: {
    ...mapActions("vertex", ["addVertex"]),
    ...mapActions("edge", ["addEdge"]),
    addNewVertex(e) {
      const stage = e.target.getStage();
      const pos = stage.getPointerPosition();
      const newVertex = { x: pos.x, y: pos.y, id: this.availableVertexId };
      this.addVertex({ vertex: newVertex });
    },
    handleMouseDown(e) {
      if (!(e.target instanceof Konva.Circle)) return;
      if (this.addEdgeOption) {
        this.canDrawLine = true;
        const clickedVertex = this.vertexes.find(v => v.id === e.target.id());
        this.currentEdge.start = {
          vertex: clickedVertex.id,
          x: clickedVertex.x,
          y: clickedVertex.y
        };
        this.currentEdge.id = this.availableEdgeId;
      }
    },
    handleMouseMove(e) {
      if (!this.canDrawLine) return;
      if (this.addEdgeOption) {
        const pos = e.target.getStage().getPointerPosition();
        this.currentEdge.end = { x: pos.x, y: pos.y };
      }
      //   TODO: fix it, should show drawing line all time
    },
    handleMouseUp(e) {
      if (!(e.target instanceof Konva.Circle)) return;
      if (this.addEdgeOption) {
        this.canDrawLine = false;
        const clickedVertex = this.vertexes.find(v => v.id === e.target.id());
        if (clickedVertex.id) {
          this.currentEdge.end = {
            vertex: clickedVertex.id,
            x: clickedVertex.x,
            y: clickedVertex.y
          };
          this.addEdge(this.currentEdge);
        }
        this.currentEdge = {};
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/main.scss";

.canvas-board {
  @include grid(2, 3, 2, 3);
}
</style>
