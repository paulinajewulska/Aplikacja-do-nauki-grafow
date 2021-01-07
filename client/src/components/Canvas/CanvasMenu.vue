<template>
  <div class="canvas-header__wrapper">
    <div class="canvas-header">
      <p class="canvas-header__label">Węzęł</p>
      <div class="canvas-header__buttons">
        <app-canvas-button
          label="dodaj"
          :option="addVertexOption"
          optionName="addVertexOption"
          icon="fa-pen"
          :funOnClick="setAddVertexOption"
        />
        <app-canvas-button
          label="usuń"
          :option="removeVertexOption"
          optionName="removeVertexOption"
          icon="fa-pen"
          :funOnClick="setRemoveVertexOption"
        />
      </div>
    </div>
    <div class="canvas-header">
      <p class="canvas-header__label">Krawędź</p>
      <div class="canvas-header__buttons">
        <app-canvas-button
          label="dodaj"
          :option="addEdgeOption"
          optionName="addEdgeOption"
          icon="fa-pen"
          :funOnClick="setAddEdgeOption"
        />
        <app-canvas-button
          label="usuń"
          :option="removeEdgeOption"
          optionName="removeEdgeOption"
          icon="fa-pen"
          :funOnClick="setRemoveEdgeOption"
        />
      </div>
    </div>
    <div class="canvas-header canvas-header__big">
      <p class="canvas-header__label">Graf</p>
      <div class="canvas-header__buttons canvas-header__big__buttons">
        <app-canvas-button
          label="skierowany"
          :option="isDirected"
          icon="fa-pen"
          :funOnClick="toggleIsDirectedAll"
        />
        <app-canvas-button
          label="wagowy"
          :option="isWeighted"
          icon="fa-pen"
          :funOnClick="toggleWeightedOptions"
        />
        <app-canvas-button
          label="usuń"
          :option="false"
          icon="fa-pen"
          :funOnClick="deleteAll"
        />
        <app-canvas-button
          v-if="requireSelectedVertex"
          label="wybierz węzęł"
          :option="selectVertexAvailable"
          icon="fa-pen"
          :funOnClick="toggleSelectVertexAvailable"
        />
        <app-canvas-button
          label="wynik"
          :option="true"
          icon="fa-pen"
          :funOnClick="loadSolution"
        />
      </div>
    </div>
    <div v-if="isWeighted" class="canvas-header canvas-header__big">
      <p class="canvas-header__label">Graf wagowy</p>
      <div class="canvas-header__buttons canvas-header__big__butons">
        <form class="d-flex align-items-center align-content-center">
          <b-form-input
            v-model="weight"
            :number="true"
            class="canvas-header__input w-50"
          ></b-form-input>
          <app-canvas-button
            label="ustaw wagę"
            :option="true"
            icon="fa-pen"
            :funOnClick="setEdgeWeight"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import CanvasButton from "@/components/Canvas/CanvasElements/CanvasButton";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "CanvasHeader",
  data() {
    return {
      weight: 1
    };
  },
  components: {
    AppCanvasButton: CanvasButton
  },
  computed: {
    ...mapGetters([
      "isDirected",
      "isWeighted",
      "requireSelectedVertex",
      "selectVertexAvailable"
    ]),
    ...mapGetters("vertex", ["addVertexOption", "removeVertexOption"]),
    ...mapGetters("edge", [
      "addEdgeOption",
      "removeEdgeOption",
      "addWeightToEdgeOption"
    ])
  },
  methods: {
    ...mapActions(["loadSolution", "deleteAll"]),
    ...mapActions("edge", ["updateEdge"]),
    ...mapMutations([
      "toggleIsDirected",
      "toggleIsWeighted",
      "toggleSelectVertexAvailable"
    ]),
    ...mapMutations("vertex", ["setAddVertexOption", "setRemoveVertexOption"]),
    ...mapMutations("edge", [
      "setAddEdgeOption",
      "setRemoveEdgeOption",
      "toggleAddWeightToEdgeOption"
    ]),
    toggleIsDirectedAll() {
      this.toggleIsDirected();
      this.deleteAll();
    },
    setEdgeWeight() {
      this.updateEdge(this.weight);
    },
    toggleWeightedOptions() {
      this.toggleIsWeighted();
      this.toggleAddWeightToEdgeOption();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/main.scss";

.canvas-header {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid $gray;
  border-left: 1px solid $gray;
  padding: 0.25rem;

  @include media-breakpoint-up(lg) {
    flex-wrap: wrap;
  }

  &__label {
    font-size: 0.8rem;
    margin: 0 0 0.25rem;

    @include media-breakpoint-up(sm) {
      font-size: 0.55rem;
      text-align: center;
    }
  }

  &__buttons {
    display: flex;
    align-content: center;
    margin: 0;
    padding: 0;
    @include media-breakpoint-up(lg) {
      flex-wrap: wrap;
      flex-direction: column;
    }
  }

  &__input {
    border-radius: $border-radius;
  }

  &__wrapper {
    position: absolute;
    top: 0;
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    @include media-breakpoint-up(lg) {
      right: 0;
      width: 6.3rem;
      height: fit-content;
    }
  }

  &__big {
    @include media-breakpoint-up(lg) {
      width: 6.3rem;

      &__buttons {
        flex-direction: row;
        justify-content: center;

        * {
          &:nth-child(2n - 1) {
            margin-right: 0.3rem;
          }
          &:nth-child(2n) {
            margin-right: 0;
          }
        }
      }
    }
  }
}
</style>
