<template>
  <transition name="fade">
    <div id="app" class="home">
      <base-sidebar
        :class="[isSidebarOpen ? 'home-sidebar__open' : '']"
        @sidebar-close="isSidebarOpen = false"
        class="home-sidebar"
      />
      <main class="home-content" :class="{ '-OpenSidebar': isSidebarOpen }">
        <base-nav-bar />
        <router-view />
      </main>
    </div>
  </transition>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import BaseSidebar from './components/ui/BaseSidebar.vue'
import BaseNavBar from './components/ui/BaseNavBar.vue'
export default defineComponent({
  components: {
    BaseSidebar,
    BaseNavBar,
  },
  setup() {
    const isSidebarOpen = ref<boolean>(false)
    return {
      isSidebarOpen,
    }
  },
})
</script>
<style lang="scss">
.home {
  display: flex;
  width: 100%;
  min-height: 100vh;
  font-family: $font-primary;
  &-sidebar {
    width: 20.3%;
    height: inherit;
    min-height: 100vh;
    border-right: 1px solid $gray-lighter;
  }
  &-content {
    width: 100%;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
