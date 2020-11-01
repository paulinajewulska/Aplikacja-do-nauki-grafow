<template>
  <div class="lesson">
    <div class="lesson__top">
      <p>{{ name }}</p>
    </div>
    <div class="lesson__bottom">
      <router-link :to="url">Link </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Lesson",
  props: {
    name: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/main";

.lesson {
  position: relative;
  width: 100%;
  min-height: 10rem;
  margin: 1rem 0;
  padding: $padding-component / 1.5;
  background-color: $pink;
  border-radius: $border-radius;

  @include media-breakpoint-up(lg) {
    width: 25vw;
    margin: 1rem;
    background-color: $white;
  }

  &__top {
    font-size: 1.5rem;
  }

  &__bottom {
    position: absolute;
    bottom: $padding-component / 1.5;
    right: $padding-component / 1.5;
    a {
      display: block;
      width: 2.5rem;
      height: 2.5rem;
      text-align: center;
      background-color: bisque;
      border-radius: 50%;
    }
  }
}
</style>
