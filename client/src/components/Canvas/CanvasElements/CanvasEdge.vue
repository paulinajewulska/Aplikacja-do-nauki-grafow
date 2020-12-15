<template>
  <div>
    <app-canvas-directed-edge v-if="isDirected" :edge="edge" />
    <app-canvas-default-edge v-else :edge="edge" />
  </div>
</template>

<script>
import CanvasDefaultEdge from "@/components/Canvas/CanvasEdge/CanvasDefaultEdge";
import CanvasDirectedEdge from "@/components/Canvas/CanvasEdge/CanvasDirectedEdge";
import { mapGetters } from "vuex";

export default {
  name: "CanvasEdge",
  props: {
    edge: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(["isDirected"])
  },
  components: {
    AppCanvasDefaultEdge: CanvasDefaultEdge,
    AppCanvasDirectedEdge: CanvasDirectedEdge
  }
};
</script>
