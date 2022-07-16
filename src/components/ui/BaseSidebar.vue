<template>
  <aside class="sidebar">
    <header class="sidebar-brand">
      <img :src="require('@/assets/logo.png')" alt="Laquesis" />
    </header>
    <nav class="sidebar-navigation">
      <ul class="sidebar-list -manage">
        <li class="sidebar-list__item">
          <h6>
            {{ RouteNames.Manage }}
          </h6>
        </li>
        <li class="sidebar-list__item">
          <router-link :to="{ name: RouteNames.Experiments }">{{ RouteNames.Experiments }} </router-link>
        </li>
        <li class="sidebar-list__item">
          <router-link :to="{ name: RouteNames.FeatureFlags }">{{ RouteNames.FeatureFlags }} </router-link>
        </li>
      </ul>

      <ul class="sidebar-list -user">
        <li class="sidebar-list__item">
          <h6>
            {{ RouteNames.User }}
          </h6>
        </li>
        <li class="sidebar-list__item">
          <router-link :to="{ name: RouteNames.Profile }">
            {{ RouteNames.Profile }}
          </router-link>
        </li>
        <li class="sidebar-list__item">
          <router-link :to="{ name: RouteNames.Settings }">
            {{ RouteNames.Settings }}
          </router-link>
        </li>
        <li class="sidebar-list__item">
          <router-link :to="{ name: RouteNames.Documentation }">
            {{ RouteNames.Documentation }}
          </router-link>
        </li>
        <li class="sidebar-list__item">
          <router-link :to="{ name: RouteNames.Faqs }">
            {{ RouteNames.Faqs }}
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { RouteNames } from '~/router/route-name'
export default defineComponent({
  setup() {
    return {
      RouteNames,
    }
  },
})
</script>

<style lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4rem;
  &-brand {
  }
  &-navigation {
    width: 100%;
  }
  &-list {
    width: 100%;
    padding-top: 4.2rem;
    h6 {
      @include subtitle-2;
      color: $gray-light;
    }
    &__item {
      display: flex;
      width: 100%;
      height: pxToRem(44);
      align-items: center;
      color: $gray-black;
      @include body-1;
      &:first-of-type {
        padding-left: 4rem;
        letter-spacing: 1%;
        @include body-2;
      }
      & a {
        display: flex;
        width: 100%;
        height: inherit;
        align-items: center;
        padding-left: 4rem;
        background: inherit;
        &.active {
          @include font-bold;
          position: relative;
          background-color: rgba($lilac, 0.3);
          color: $purple-rain;
          letter-spacing: 2.5%;
          &::after {
            position: absolute;
            top: 0;
            right: -0.3rem;
            bottom: 0;
            width: 0.5rem;
            background-color: $purple-rain;
            content: '';
          }
        }
      }
    }
  }
}

.router-link-active > div,
.router-link-active span {
  /* background-color: ; */
}
</style>
