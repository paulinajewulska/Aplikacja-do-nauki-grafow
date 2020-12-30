<template>
  <button
    type="button"
    class="canvas-btn"
    :class="[option ? 'canvas-btn-primary' : 'canvas-btn-default']"
    @click="funOnClick"
  >
    <i class="canvas-btn__icon fas" :class="icon"></i>
    <span class="canvas-btn__label">{{ label }}</span>
  </button>
</template>

<script>
export default {
  name: "CanvasButton",
  data() {
    return {};
  },
  props: {
    label: {
      type: String,
      required: true
    },
    option: {
      required: true
    },
    icon: {
      required: true,
      default: "fa-pen"
    },
    funOnClick: {
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../style/main.scss";

.canvas-btn {
  @include shadow;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  border: none;
  border-radius: 15px;
  margin-right: 0.3rem;
  padding: 1.25rem;

  &:last-child {
    margin-right: 0;
  }

  @include media-breakpoint-up(lg) {
    margin: 0.3rem 0 0;
  }

  &-primary {
    background-color: $green;
  }

  &-default {
    background-color: $gray;
  }

  &__icon {
    margin: 0.1rem 0 0;
    font-size: 0.75rem;
  }

  &__label {
    display: block;
    width: fit-content;
    margin: 0.1rem 0 0;
    font-size: 0.7rem;
    text-align: center;
    @include media-breakpoint-up(sm) {
      margin: 0;
      font-size: 0.6rem;
    }
  }
}
</style>
