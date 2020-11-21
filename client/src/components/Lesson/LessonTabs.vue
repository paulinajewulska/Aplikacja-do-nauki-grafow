<template>
  <div class="lesson">
    <b-tabs content-class="mt-3" justified>
      <b-tab title="Opis" active>
        <p>{{ description }}</p>
      </b-tab>
      <b-tab title="Pseudokod"
        ><p>{{ pseudocode }}</p></b-tab
      >
    </b-tabs>
  </div>
</template>

<script>
export default {
  name: "LessonTabs",
  data() {
    return {
      description: "I'm the first tab",
      pseudocode: "I'm the second tab"
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/main";

.lesson {
  @include shadow($gray);
  width: 100%;
  margin: $margin-mobile 0;
  border: 1px solid $gray;
  // TODO: fix border radius in original tabs
  border-radius: $border-radius;
}

@include media-breakpoint-up(lg) {
  .lesson {
    width: 40%;
  }
}
</style>
