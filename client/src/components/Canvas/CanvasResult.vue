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
  @include grid(2, 3, 3, 4);
  border: 1px solid $gray;
  border-radius: 2px;
}
</style>
