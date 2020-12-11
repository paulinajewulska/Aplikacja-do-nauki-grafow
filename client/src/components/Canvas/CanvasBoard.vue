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
        <app-canvas-vertex
          v-for="item of vertexList"
          :vertex="item"
          :key="item.id"
        />
        <app-canvas-edge
          v-for="edge of edgeList"
          :key="`edge-${edge.id}`"
          :edge="edge"
        />
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
    ...mapGetters([
      "vertexList",
      "addVertexOption",
      "availableVertexId",
      "vertexNumber"
    ]),
    ...mapGetters("edge", ["edgeList", "addEdgeOption", "availableEdgeId"])
  },
  components: {
    AppCanvasVertex: CanvasVertex,
    AppCanvasEdge: CanvasEdge
  },
  methods: {
    ...mapActions(["addVertex"]),
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
        const clickedVertex = this.vertexList.find(v => v.id === e.target.id());
        this.currentEdge.start = { x: clickedVertex.x, y: clickedVertex.y };
        this.currentEdge.id = this.availableEdgeId;
      }
    },
    handleMouseMove(e) {
      // TODO: ix fix fix it
      if (!this.canDrawLine) return;
      if (this.addEdgeOption) {
        const pos = e.target.getStage().getPointerPosition();
        this.currentEdge.end = { x: pos.x, y: pos.y };
        // add edge to edgeList
      }
    },
    handleMouseUp(e) {
      if (!(e.target instanceof Konva.Circle)) return;
      if (this.addEdgeOption) {
        this.canDrawLine = false;
        this.currentEdge.end = { x: e.target.x(), y: e.target.y() };
        this.addEdge({ edge: this.currentEdge });
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
