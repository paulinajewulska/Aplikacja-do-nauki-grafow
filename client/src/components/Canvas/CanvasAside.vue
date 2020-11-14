<template>
  <div class="aside">
    <button
      type="button"
      class="btn my-2"
      :class="[addVertexOption ? 'btn-primary' : 'btn-light']"
      @click="toggleAddVertexOption"
    >
      Dodaj węzeł
    </button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "CanvasAside",
  computed: {
    ...mapGetters(["addVertexOption"])
  },
  methods: {
    ...mapMutations(["toggleAddVertexOption"])
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/main.scss";

.aside {
  @include grid(1, 2, 2, 3);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
</style>
