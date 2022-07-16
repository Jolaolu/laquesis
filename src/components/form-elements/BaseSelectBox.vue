<template>
  <div class="selectbox">
    <button type="button" class="selectbox-text" :class="{ '-has-border': hasBorder }" @click="showSelectBox">
      <span> {{ selected }}</span>
      <caret-icon :class="{ clicked: isSelectClicked }" />
    </button>
    <div v-if="isSelectClicked" class="selectbox-menu">
      <ul v-for="(item, index) in selectBoxItems" :key="index">
        <li>
          <button type="button" @click="setSelectClick(item)">
            {{ typeof item === 'string' ? item : item.name }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, PropType } from 'vue'
import CaretIcon from '~/components/icons/CaretIcon.vue'
import { IRegion } from '~/services/interfaces'
export default defineComponent({
  components: { CaretIcon },
  props: {
    selectBoxItems: {
      type: Array as PropType<Array<string | IRegion>>,
      required: true,
    },
    hasBorder: {
      type: Boolean,
      required: false,
      default: false,
    },
    default: {
      type: String,
      required: false,
    },
  },
  setup(props, { emit }) {
    const isSelectClicked = ref<boolean>(false)
    const selected = ref<string | null>(null)

    const setSelectClick = (item: IRegion | string): void => {
      const selectedValue = typeof item === 'string' ? item : item.name
      selected.value = selectedValue
      emit('selected-item', item)
      showSelectBox()
    }
    const showSelectBox = (): void => {
      isSelectClicked.value = !isSelectClicked.value
    }

    const isString = (item: any): boolean => {
      return typeof item === 'string'
    }

    onMounted(() => {
      if (props.default) {
        selected.value = props.default
      } else {
        const [firstItem] = props.selectBoxItems
        const firstItemValue = typeof firstItem === 'string' ? firstItem : firstItem.name
        selected.value = firstItemValue
      }
    })
    return {
      isString,
      isSelectClicked,
      selected,
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
    color: $purple-rain;
    letter-spacing: 0.025em;
    line-height: 19px;
    @include subtitle-1;
    text-transform: capitalize;
    span {
      margin-right: 3rem;
    }
    &.-has-border {
      border: 1px solid $purple-rain;
    }
    .clicked {
      transform: rotate(180deg);
    }
  }
  &-menu {
    position: absolute;
    overflow: scroll;
    width: 20rem;
    height: 13rem;
    background: $white;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.306764);
    li {
      padding: 0.5rem 0.5rem;
      &:hover {
        background: $gray-lightest;
      }
    }
  }
}
</style>
