<template>
  <div class="home">
    <div class="home__text-wrapper">
      <p class="home__text">
        Rozpocznij naukę grafów z naszą aplikacją!
      </p>
      <router-link
        v-if="navigationList[0]"
        :to="getUrl(navigationList[0].url)"
        class="home__button"
      >
        Zaczynajmy!
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapGetters(["navigationList"])
  },
  methods: {
    getUrl: url => `/${url}`
  }
};
</script>

<style lang="scss" scoped>
@import "../style/main.scss";

.home {
  display: flex;
  flex-direction: column;

  @include media-breakpoint-up(lg) {
    flex-direction: row;
  }

  &__text {
    width: 85%;
    margin-bottom: 2rem;
    font-size: 1.75rem;

    &-wrapper {
      @extend .board;
      display: flex;
      flex-direction: column;
      margin-top: 4rem;

      @include media-breakpoint-up(lg) {
        justify-content: center;
        margin-top: inherit;
        padding-left: 1.5rem;
      }
    }
  }

  &__button {
    @include shadow($yellow);
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: 100%;
    border: none;
    border-radius: $border-radius;
    padding: 0.75rem;
    background-color: $yellow;
    @include media-breakpoint-up(lg) {
      margin-bottom: 4rem;
    }
  }
}
</style>
