<template>
  <section class="pagination">
    <div class="rows">
      <span>Rows per page:</span>
      <base-select-box :select-box-items="rows" @selected-item="$emit('per-page', $event)" />
    </div>
    <div class="pagination-data">{{ pageFrom }}-{{ pageTo }} of {{ totalLength }}</div>
  </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import BaseSelectBox from '~/components/form-elements/BaseSelectBox.vue'

export default defineComponent({
  components: { BaseSelectBox },
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
  },
  setup() {
    const rows = ['10', '20', '30', '40']
    return {
      rows,
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
  }
}
</style>
