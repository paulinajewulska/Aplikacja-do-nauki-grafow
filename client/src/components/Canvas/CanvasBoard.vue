<template>
  <div class="canvas-board">
    <v-stage
      ref="stage"
      class="stage"
      :config="configKonva"
      @click="addVertexOption ? addNewVertex($event) : {}"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
    >
      <v-layer>
        <app-canvas-edge v-for="e of edges" :key="`edge-${e.id}`" :edge="e" />
        <v-line
          v-for="line in connections"
          :key="100 * line.id"
          :config="{
            stroke: '#ffd73c',
            strokeWidth: 5,
            points: line.points
          }"
        />
        <app-canvas-vertex v-for="v of vertexes" :vertex="v" :key="v.id" />
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
        width: 1000,
        height: 1000
      },
      canDrawLine: false,
      currentEdge: {},
      connections: []
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
      this.connections.push({
        id: Math.random(),
        points: [e.target.x(), e.target.y()]
      });
    },
    handleMouseMove(e) {
      if (!this.canDrawLine) return;
      if (this.addEdgeOption) {
        const pos = e.target.getStage().getPointerPosition();
        this.currentEdge.end = { x: pos.x, y: pos.y };
        const lastLine = this.connections[this.connections.length - 1];
        lastLine.points = [
          lastLine.points[0],
          lastLine.points[1],
          pos.x,
          pos.y
        ];
      }
    },
    handleMouseUp(e) {
      if (!(e.target instanceof Konva.Circle)) {
        this.connections = [];
        return;
      }
      if (this.addEdgeOption) {
        this.connections = [];
        this.canDrawLine = false;
        const clickedVertex = this.vertexes.find(v => v.id === e.target.id());
        if (
          clickedVertex.id &&
          clickedVertex.id !== this.currentEdge.start.vertex
        ) {
          this.currentEdge.end = {
            vertex: clickedVertex.id,
            x: clickedVertex.x,
            y: clickedVertex.y
          };
          this.addEdge(this.currentEdge);
        }
        this.currentEdge = {};
      }
    },
    addNewVertexMobile(stage) {
      stage.on("touchstart", e => {
        if (this.addVertexOption) {
          this.addNewVertex(e);
        }
      });
      stage.on("touchmove", e => {
        if (this.addEdgeOption) {
          this.handleMouseMove(e);
        }
      });
      stage.on("touchend", e => {
        if (this.addEdgeOption) {
          this.handleMouseUp(e);
        }
      });
    },
    drawNewEdge(stage) {
      stage.on("touchstart", e => {
        if (this.addEdgeOption) {
          this.handleMouseDown(e);
        }
      });
    }
  },
  mounted() {
    const transformerNode = this.$refs.stage.getNode();
    const stage = transformerNode.getStage();
    this.addNewVertexMobile(stage);
    this.drawNewEdge(stage);
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/main.scss";

.canvas-board {
  overflow: hidden;

  canvas {
    height: 20rem;
    width: 100%;
  }
}
</style>
