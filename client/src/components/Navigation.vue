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
      <div v-for="item of navigationList" :key="item.id" class="nav__list">
        <router-link class="nav__list-item" :to="getUrl(item.url)">
          {{ item.name }}
        </router-link>
      </div>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Navigation",
  data() {
    return {
      applicationName: "Grafy",
      error: null,
      loading: false
    };
  },
  computed: {
    ...mapGetters({ navigationList: "getNavigationList" })
  },
  methods: {
    ...mapActions(["loadNavigationList"]),
    fetchData() {
      this.error = null;
      this.loading = true;
      try {
        this.$store.dispatch("loadNavigationList");
      } catch (err) {
        this.error = err.toString();
      } finally {
        this.loading = false;
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
@import "../style/main";

.nav {
  padding: $padding-component;

  &__logo {
    font-size: 2rem;
  }
  &__list {
    &:hover {
      a {
        color: $dark;
      }
    }
    &-item {
      display: block;
      margin: 0.5rem;
      width: 100%;
      color: $font-secondary;
      text-align: left;
    }
    &-wrapper {
      margin-top: 0.25rem;
      width: 100%;
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
    width: 15vw;
    height: 100vh;

    &__list {
      &:hover {
        background-color: $hover;
        border-radius: $border-radius;
        a {
          color: $dark;
        }
      }
      &-wrapper {
        display: flex;
        flex-direction: column !important;
        align-items: flex-start;
        transform: translateX(-0.5rem);
      }
    }
  }
}
</style>
