<template>
  <div class="category-card">
    <p class="category-card__title">{{ title }}</p>
    <router-link :to="url" append class="category-card__button">{{
      linkName
    }}</router-link>
  </div>
</template>

<script>
export default {
  name: "CategoryCard",
  data() {
    return {
      linkName: "Start"
    };
  },
  props: {
    title: {
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
@import "../../style/main";

.category-card {
  @include shadow;
  display: flex;
  align-items: center;
  align-content: flex-start;
  width: 100%;
  min-height: 10vh;
  margin: $margin-mobile 0 0;
  border-radius: $border-radius;
  padding: $padding-component-mobile;
  background-color: $white;
  overflow: auto;

  &__title {
    display: block;
    width: 70%;
    height: fit-content;
    margin: auto 10% auto 0;
    font-size: $font-size;
  }

  &__button {
    @include shadow($light-yellow);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20%;
    height: 100%;
    border-radius: $border-radius;
    background-color: $light-yellow;
  }

  @include media-breakpoint-up(lg) {
    flex-wrap: wrap;
    width: 30%;
    min-height: 15vh;
    margin: $margin-desktop;

    &__title {
      width: 100%;
      margin: $margin-desktop 0;
    }
    &__button {
      height: fit-content;
      margin-left: auto;
      padding: $padding-component-mobile/2 $padding-component-mobile;
    }
  }
}
</style>
