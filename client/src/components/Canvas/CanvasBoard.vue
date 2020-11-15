<template>
  <div class="board">
    <v-stage
      ref="stage"
      :config="configKonva"
      @click="addVertexOption ? addNewVertex($event) : {}"
    >
      <v-layer>
        <app-canvas-vertex
          v-for="item in vertexList"
          :vertex="item"
          :key="item.id"
        ></app-canvas-vertex>
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CanvasVertex from "@/components/CanvasElements/CanvasVertex";

export default {
  name: "CanvasBoard",
  data() {
    return {
      configKonva: {
        // TODO: make it responsive
        width: 400,
        height: 400
      }
    };
  },
  computed: {
    ...mapGetters([
      "vertexList",
      "addVertexOption",
      "availableId",
      "vertexNumber"
    ])
  },
  components: {
    AppCanvasVertex: CanvasVertex
  },
  methods: {
    ...mapActions(["addVertex"]),
    addNewVertex(e) {
      if (this.vertexNumber >= 5) {
        console.log("Limit: 5 ");
      } else {
        const stage = e.target.getStage();
        const pos = stage.getPointerPosition();
        const newVertex = { x: pos.x, y: pos.y, id: this.availableId };
        this.addVertex({ vertex: newVertex });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/main.scss";

.board {
  @include grid(2, 3, 2, 3);
}
</style>
