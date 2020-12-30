<template>
  <div class="canvas">
    <app-canvas-header />
    <app-canvas-board />
    <app-canvas-result />
  </div>
</template>

<script>
import CanvasHeader from "./CanvasHeader";
import CanvasBoard from "./CanvasBoard";
import CanvasResult from "./CanvasResult";

export default {
  name: "Canvas",
  components: {
    AppCanvasHeader: CanvasHeader,
    AppCanvasBoard: CanvasBoard,
    AppCanvasResult: CanvasResult
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/main.scss";

.canvas {
  @include shadow;
  position: relative;
  width: 100%;
  margin: $margin-mobile 0;
  border: 1px solid $gray;
  border-radius: 15px;
  padding: 0;
  overflow: hidden;
}

@include media-breakpoint-up(lg) {
  .canvas {
    width: 65%;
    height: calc(100vh - 2rem);
    margin-top: 0;
    margin-left: 2rem;
  }
}
</style>
