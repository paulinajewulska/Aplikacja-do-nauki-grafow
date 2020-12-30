<template>
  <div class="canvas-result">
    {{ result }}
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CanvasResult",
  computed: {
    ...mapGetters(["result"])
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/main.scss";

.canvas-result {
  height: 3rem;
  width: 100%;
  position: absolute;
  bottom: 0;
  border-top: 1px solid $gray;
}
</style>
