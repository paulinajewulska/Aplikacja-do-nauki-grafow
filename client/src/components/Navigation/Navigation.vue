<template>
  <b-navbar toggleable="lg" class="nav">
    <b-navbar-brand>
      <router-link to="/" class="nav__logo">{{ applicationName }}</router-link>
    </b-navbar-brand>
    <b-navbar-toggle
      class="nav__burger"
      target="nav-collapse"
    ></b-navbar-toggle>
    <b-collapse
      v-if="navigationList"
      id="nav-collapse"
      is-nav
      class="nav__list-wrapper"
    >
      <div class="nav__list">
        <router-link
          v-for="item of navigationList"
          :key="item.id"
          :to="getUrl(item.url)"
          class="nav__list-item"
        >
          {{ item.name }}
        </router-link>
      </div>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Navigation",
  data() {
    return {
      applicationName: "Grafy"
    };
  },
  computed: {
    ...mapGetters({ navigationList: "navigationList" })
  },
  methods: {
    fetchData() {
      try {
        this.$store.dispatch("loadNavigationList");
      } catch (err) {
        console.log(err.toString());
      }
    },
    getUrl: url => `/${url}`
  },
  created() {
    this.fetchData();
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/main";

.nav {
  @include shadow($yellow);
  margin: $margin-mobile;
  border-radius: $border-radius;
  padding: $padding-component-mobile;
  background-color: $yellow;

  &__logo {
    font-size: $font-size-header-mobile;
  }

  &__burger {
    border: none;
  }

  &__list {
    // TODO: add active class
    &-item {
      display: block;
      padding: $padding-component-mobile/2 0;
    }

    &-wrapper {
      margin-top: $margin-mobile/2;
    }
  }
}

@include media-breakpoint-up(lg) {
  .nav {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: $navigation-width;
    height: calc(100vh - 2 * #{$margin-mobile});

    &__list {
      &-item {
        margin: $margin-desktop 0;
        padding: $padding-component/4;
        font-size: $navigation-font-size;

        &:hover {
          @include shadow($light-yellow);
          border-radius: $border-radius;
          background-color: $light-yellow;
        }
      }

      &-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: calc(#{$navigation-width} - 2 * #{$margin-desktop});
        transform: translateX(-#{$margin-desktop});
      }
    }
  }
}
</style>
