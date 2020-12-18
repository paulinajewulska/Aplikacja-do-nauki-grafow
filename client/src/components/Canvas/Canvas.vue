<template>
  <section class="canvas">
    <app-canvas-aside />
    <app-canvas-board />
    <app-canvas-header />
    <app-canvas-result />
  </section>
</template>

<script>
import CanvasAside from "./CanvasAside";
import CanvasBoard from "./CanvasBoard";
import CanvasHeader from "./CanvasHeader";
import CanvasResult from "./CanvasResult";

export default {
  name: "Canvas",
  components: {
    AppCanvasAside: CanvasAside,
    AppCanvasBoard: CanvasBoard,
    AppCanvasHeader: CanvasHeader,
    AppCanvasResult: CanvasResult
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/main.scss";

.canvas {
  position: relative;
  display: grid;
  grid-template-columns: 10vh auto;
  grid-template-rows: 10vh auto 10vh;
  width: 100%;
  margin: $margin-mobile 0;
  background-color: $light;
  overflow: hidden;
}

@include media-breakpoint-up(lg) {
  .canvas {
    width: 65%;
    margin-left: 5%;
  }
}
</style>
