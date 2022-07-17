<template>
  <header class="header">
    <nav class="open">
      <base-button @click="$emit('sidebar-open')">
        <hamburger-icon />
      </base-button>
    </nav>
    <base-search-box class="header-search" />
    <user-details class="header-details" />
  </header>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import BaseSearchBox from '~/components/form-elements/BaseSearchBox.vue'
import UserDetails from './UserDetails.vue'
import BaseButton from '~/components/form-elements/BaseButton.vue'
import { HamburgerIcon } from '~/components/icons/index'

export default defineComponent({
  components: {
    BaseButton,
    BaseSearchBox,
    UserDetails,
    HamburgerIcon,
  },
})
</script>

<style lang="scss">
.header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 1.8rem 3rem 2rem 4.45rem;
  border: 1px solid $gray-lighter;
  @include screen(mid) {
    padding: 2rem;
    background: $gray-darkest;
  }
  &-details {
    display: none;
  }
  &-search {
    width: 75%;
  }
}

.open {
  button {
    @include screen(custom, min, 769) {
      display: none;
    }
  }
}
</style>
