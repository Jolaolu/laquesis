<template>
  <header class="header">
    <base-search-box />
    <user-details />
  </header>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import BaseSearchBox from '~/components/form-elements/BaseSearchBox.vue'
import UserDetails from './UserDetails.vue'

export default defineComponent({
  components: {
    BaseSearchBox,
    UserDetails,
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
}
</style>
