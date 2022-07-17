<template>
  <section class="pagination">
    <div class="rows">
      <span>Rows per page:</span>
      <base-select-box :select-box-items="rows" @selected-item="setPerPage" />
    </div>
    <div class="pagination-data">
      {{ pageFrom }}-{{ pageTo }} of {{ totalLength }}
      <div class="pagination-buttons">
        <base-button class="previous" :disabled="currentPage === 1" @click="$emit('change-page', 'previous')">
          <caret-icon />
        </base-button>
        <base-button class="next" :disabled="currentPage === totalNumberOfPages" @click="$emit('change-page', 'next')">
          <caret-icon />
        </base-button>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { convertToNumber } from '~/helpers/index'
import BaseSelectBox from '~/components/form-elements/BaseSelectBox.vue'
import BaseButton from '~/components/form-elements/BaseButton.vue'
import CaretIcon from '~/components/icons/CaretIcon.vue'

export default defineComponent({
  emits: ['per-page', 'change-page'],
  components: { BaseSelectBox, BaseButton, CaretIcon },
  props: {
    pageTo: {
      type: Number,
      required: true,
    },
    pageFrom: {
      type: Number,
      required: true,
    },
    totalLength: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const rows = ['10', '20', '30', '40']
    const perPage = ref<string>('')

    const setPerPage = (rows: string): void => {
      perPage.value = rows
      emit('per-page', rows)
    }
    const totalNumberOfPages = computed(() => Math.ceil(props.totalLength / convertToNumber(perPage.value)))

    return {
      rows,
      setPerPage,
      totalNumberOfPages,
    }
  },
})
</script>
<style lang="scss">
.pagination {
  display: flex;
  align-items: center;
  .rows {
    display: flex;
    align-items: center;
    margin-right: 9rem;
    & .selectbox-text {
      color: $gray-black;
    }
    .selectbox {
      position: relative;
    }
    & .selectbox-menu {
      top: 0;
    }
  }
  &-data {
    display: flex;
    align-items: center;
  }
  &-buttons {
    display: flex;
    align-items: center;
    & .previous {
      transform: rotate(90deg);
    }
    .next {
      transform: rotate(-90deg);
    }
  }
}
</style>
