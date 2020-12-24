<template>
  <section>
    <div class="canvas-header__wrapper">
      <div class="canvas-header w-50">
        <p class="canvas-header__label">Węzęł</p>
        <div class="canvas-header__buttons">
          <app-canvas-button
            label="dodaj"
            :option="addVertexOption"
            icon="fa-pen"
            :funOnClick="toggleAddVertexOption"
          />
          <app-canvas-button
            label="usuń"
            :option="removeVertexOption"
            icon="fa-pen"
            :funOnClick="toggleRemoveVertexOption"
          />
        </div>
      </div>
      <div class="canvas-header w-50">
        <p class="canvas-header__label">Krawędź</p>
        <div class="canvas-header__buttons">
          <app-canvas-button
            label="dodaj"
            :option="addEdgeOption"
            icon="fa-pen"
            :funOnClick="toggleAddEdgeOption"
          />
          <app-canvas-button
            label="usuń"
            :option="removeEdgeOption"
            icon="fa-pen"
            :funOnClick="toggleRemoveEdgeOption"
          />
        </div>
      </div>
      <div class="canvas-header w-md-50 w-100">
        <p class="canvas-header__label">Graf</p>
        <div class="canvas-header__buttons">
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
            :funOnClick="toggleIsWeighted"
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
      <div v-if="isWeighted" class="canvas-header">
        <p class="canvas-header__label">Graf wagowy</p>
        <div class="canvas-header__buttons">
          <app-canvas-button
            label="dodaj wagę"
            :option="addWeightToEdgeOption"
            icon="fa-pen"
            :funOnClick="toggleAddWeightToEdgeOption"
          />
          <form class="d-flex align-items-center">
            <b-form-input
              v-model="weight"
              class="canvas-header__input w-50 mr-2"
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
  </section>
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
    ...mapMutations("vertex", [
      "toggleAddVertexOption",
      "toggleRemoveVertexOption"
    ]),
    ...mapMutations("edge", [
      "toggleAddEdgeOption",
      "toggleRemoveEdgeOption",
      "toggleAddWeightToEdgeOption"
    ]),
    toggleIsDirectedAll() {
      this.toggleIsDirected();
      this.deleteAll();
    },
    setEdgeWeight() {
      this.updateEdge(this.weight);
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
  padding: 0.25rem;

  &__label {
    font-size: 0.8rem;
    margin: 0 0 0.25rem;

    @include media-breakpoint-up(sm) {
      font-size: 0.55rem;
    }
  }

  &__buttons {
    display: flex;
    align-content: center;
    margin: 0;
    padding: 0;
  }

  &__input {
    border-radius: $border-radius;
  }

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
  }
}
</style>
