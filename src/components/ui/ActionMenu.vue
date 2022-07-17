<template>
  <div class="action-menu" v-on-clickaway="closeSelectBox">
    <ul>
      <li v-for="(item, index) in actions" :key="index">
        <base-button @click="selectItem(item)">
          {{ item }}
        </base-button>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { directive as onClickaway } from 'vue-clickaway'
import BaseButton from '~/components/form-elements/BaseButton.vue'
export default defineComponent({
  emits: ['action', 'close'],
  components: {
    BaseButton,
  },
  directives: {
    onClickaway: onClickaway,
  },
  props: {},
  setup(_, { emit }) {
    const actions = ['launch', 'clone', 'delete']
    const closeSelectBox = (): void => emit('close')

    const selectItem = (item: string): void => {
      emit('action', item)
      closeSelectBox()
    }

    return {
      actions,
      closeSelectBox,
      selectItem,
    }
  },
})
</script>
<style lang="scss">
.action-menu {
  position: absolute;
  z-index: 2;
  top: 1rem;
  left: -7rem;
  width: 10rem;
  height: 11rem;
  background-color: $white;
  box-shadow: 2px 2px 19px rgba(0, 0, 0, 0.13);
  li {
    &:hover {
      background: $gray-lightest;
    }
    button {
      width: 100%;
      padding: 0.8rem 1rem;
      text-align: left;
      text-transform: capitalize;
    }
  }
}
</style>
