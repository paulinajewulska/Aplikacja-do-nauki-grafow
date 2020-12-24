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
  min-height: 5rem;
  border-top: 1px solid $gray;
}
</style>
