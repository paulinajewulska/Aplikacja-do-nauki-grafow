<template>
  <div class="canvas">
    <app-canvas-board />
    <app-canvas-menu />
    <app-canvas-result />
  </div>
</template>

<script>
import CanvasMenu from "./CanvasMenu";
import CanvasBoard from "./CanvasBoard";
import CanvasResult from "./CanvasResult";

export default {
  name: "Canvas",
  components: {
    AppCanvasMenu: CanvasMenu,
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
  border-radius: 15px;
  padding: 0;
  overflow: hidden;
  background-color: $white;
}

@include media-breakpoint-up(lg) {
  .canvas {
    width: 65%;
    height: calc(100vh - 8rem);
    margin-top: 3rem;
    margin-left: 2rem;
  }
}
</style>
