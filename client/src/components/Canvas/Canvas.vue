<template>
  <section class="canvas">
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

<style lang="scss" scoped>
@import "../../style/main.scss";

.canvas {
  position: relative;
  display: grid;
  grid-template-columns: 10% auto;
  grid-template-rows: 10% auto;
  width: 100%;
  height: 100%;
  margin: $margin-mobile 0;
  background-color: $light;
  overflow: hidden;
}

@include media-breakpoint-up(lg) {
  .canvas {
    width: 55%;
    margin-left: 5%;
  }
}
</style>
