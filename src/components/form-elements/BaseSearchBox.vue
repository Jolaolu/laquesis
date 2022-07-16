<template>
  <div class="search">
    <label class="icon" for="search">
      <search-icon />
    </label>
    <input type="text" class="search-input" name="search" placeholder="Search" id="search" v-model.trim="search" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import SearchIcon from '~/components/icons/SearchIcon.vue'

export default defineComponent({
  components: {
    SearchIcon,
  },
  setup() {
    const search = ref('')
    return {
      search,
    }
  },
})
</script>
<style lang="scss">
.search {
  display: flex;
  width: 100%;
  max-width: 40.3rem;
  height: 4rem;
  align-items: center;
  padding: 1.15rem 1.3rem 0.95rem;
  border: 1px solid $gray-light;
  background: $white;
  border-radius: 0.7rem;
  @include body-1;
  & .icon {
    margin-top: 0.5rem;
    margin-right: 1.8rem;
  }
  &-input {
    width: 80%;
    height: 100%;
    border: none;
    color: $gray-dark;
    letter-spacing: -0.01em;
    line-height: 19px;
    @include body-1;
    &:focus-visible {
      outline: transparent;
    }
    &::placeholder {
      color: $gray-dark;
    }
  }
}
</style>
