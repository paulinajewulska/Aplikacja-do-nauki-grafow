<template>
  <div class="board">
    <v-stage :config="configKonva">
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
import { mapGetters } from "vuex";
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
    ...mapGetters(["vertexList"])
  },
  components: {
    AppCanvasVertex: CanvasVertex
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/main.scss";

.board {
  @include grid(2, 3, 2, 3);
}
</style>
