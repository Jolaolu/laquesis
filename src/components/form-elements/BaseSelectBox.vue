<template>
  <div class="selectbox">
    <button type="button" class="selectbox-text" @click="showSelectBox">
      <span>Panamera</span>
      <caret-icon :class="{ clicked: isSelectClicked }" />
    </button>
    <div class="selectbox-menu">
      <ul v-for="item in selectBoxItems" :key="item.id">
        <li>
          <button type="button" @click="setSelectClick(item)">
            {{ item.name }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import CaretIcon from '~/components/icons/CaretIcon.vue'
import { IRegion } from '~/services/interfaces'

export default defineComponent({
  components: { CaretIcon },
  props: {
    selectBoxItems: {
      type: Object,
      required: true,
    },
  },
  setup(_, { emit }) {
    const isSelectClicked = ref<boolean>(false)
    const selected = ref<IRegion | null>(null)
    const setSelectClick = (item: IRegion): void => {
      selected.value = item
      emit('selected-item', item)
    }
    const showSelectBox = (): void => {
      isSelectClicked.value = !isSelectClicked.value
    }
    return {
      isSelectClicked,
      setSelectClick,
      showSelectBox,
    }
  },
})
</script>
<style lang="scss">
.selectbox {
  &-text {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0.8rem 1.1rem;
    border: 1px solid $purple-rain;
    color: $purple-rain;
    letter-spacing: 0.025em;
    line-height: 19px;
    @include subtitle-1;
    span {
      margin-right: 3rem;
    }
    .clicked {
      transform: rotate(180deg);
    }
  }
  &-box {
    position: absolute;
    overflow: scroll;
    width: 20rem;
    max-height: 4rem;
  }
}
</style>
