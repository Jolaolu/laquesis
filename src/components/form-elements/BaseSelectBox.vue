<template>
  <div class="selectbox">
    <base-button class="selectbox-text" :class="{ '-has-border': hasBorder }" @click="showSelectBox">
      <span v-if="isFilter">{{ defaultItem }} </span>
      <span v-else> {{ selected }}</span>
      <caret-icon :class="{ clicked: isSelectClicked }" />
    </base-button>
    <div v-if="isSelectClicked" class="selectbox-menu" v-on-clickaway="showSelectBox">
      <ul>
        <li v-for="(item, index) in selectBoxItems" :key="index">
          <base-button @click="setSelectClick(item)">
            {{ typeof item === 'string' ? item : item.name }}
          </base-button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, PropType } from 'vue'
import { directive as onClickaway } from 'vue-clickaway'
import CaretIcon from '~/components/icons/CaretIcon.vue'
import BaseButton from '~/components/form-elements/BaseButton.vue'
import { IRegion } from '~/services/interfaces'
export default defineComponent({
  directives: {
    onClickaway: onClickaway,
  },
  components: { CaretIcon, BaseButton },
  emits: ['selected-item'],
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
    defaultItem: {
      type: String,
      required: false,
    },
    isFilter: {
      type: Boolean,
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
      if (props.defaultItem) {
        selected.value = props.defaultItem
      } else {
        const [firstItem] = props.selectBoxItems
        const firstItemValue = typeof firstItem === 'string' ? firstItem : firstItem.name
        selected.value = firstItemValue
        emit('selected-item', firstItem)
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
      margin-right: 1.5rem;
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
    z-index: 2;
    overflow: scroll;
    width: 20rem;
    height: 13rem;
    background: $white;
    box-shadow: 2px 2px 19px rgba(0, 0, 0, 0.13);
    li {
      &:hover {
        background: $gray-lightest;
      }
      button {
        width: 100%;
        padding: 0.5rem 0.5rem;
        text-align: left;
      }
    }
  }
}
</style>
