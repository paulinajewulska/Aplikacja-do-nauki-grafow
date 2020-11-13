<template>
  <section>
    <app-canvas-aside />
    <app-canvas-board />
    <app-canvas-header />
  </section>
</template>

<script>
import CanvasAside from "./CanvasAside";
import CanvasBoard from "./CanvasBoard";
import CanvasHeader from "./CanvasHeader";

export default {
  name: "Canvas",
  components: {
    AppCanvasAside: CanvasAside,
    AppCanvasBoard: CanvasBoard,
    AppCanvasHeader: CanvasHeader
  }
};
</script>

<style lang="scss" scoped></style>
