<template>
  <div class="lesson">
    <div class="lesson__wrapper">
      <div class="lesson__left">
        <b-tabs content-class="mt-3" justified>
          <b-tab title="Description" active
            ><p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Asperiores assumenda at beatae blanditiis deserunt fuga illum in
              maxime molestiae nemo nihil nulla provident, repellat voluptas
              voluptates. Aut, cupiditate, unde! Impedit.
            </p></b-tab
          >
          <b-tab title="Code"><p>I'm the second tab</p></b-tab>
        </b-tabs>
      </div>
      <div class="lesson__canvas">
        <app-canvas />
      </div>
    </div>
  </div>
</template>

<script>
import Canvas from "./Canvas/Canvas";

export default {
  name: "Boards",
  components: {
    AppCanvas: Canvas
  }
};
</script>

<style lang="scss" scoped>
@import "../style/main";

.lesson {
  @extend .left-wrapper;

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    @include media-breakpoint-up(lg) {
      position: absolute;
      top: 0.5rem;
      left: 0.5rem;
      align-content: flex-start;
      align-items: flex-start;
      justify-content: flex-start;
      width: calc(80vw - 1rem);
      height: calc(100vh - 1rem);
      border-radius: $border-radius;
      background-color: $pink;
    }
  }

  &__left {
    width: 40%;
    background-color: $white;
    margin: 2rem;
    border-radius: $border-radius;
    min-height: 50%;
  }
}
</style>
