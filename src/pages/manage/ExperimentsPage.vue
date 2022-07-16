<template>
  <div class="experiments">
    <div class="experiments-intro">
      <h5 class="experiments-title">Experiments List</h5>
      <base-button class="experiments-new">
        <plus-icon />
        <span>Add New</span>
      </base-button>
    </div>
    <div class="experiments-menu">
      <div class="select">
        <base-select-box />
      </div>
      <div class="filters"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import BaseButton from '~/components/form-elements/BaseButton.vue'
import PlusIcon from '~/components/icons/PlusIcon.vue'
import BaseSelectBox from '~/components/form-elements/BaseSelectBox.vue'
import * as Regions from '~/static/regions'
import { IRegion } from '~/services/interfaces'
export default defineComponent({
  components: { BaseButton, PlusIcon, BaseSelectBox },
  setup() {
    const experimentRegion = ref<IRegion[] | null>(null)
    onMounted(() => {
      experimentRegion.value = Regions
    })
    return {}
  },
})
</script>

<style lang="scss">
.experiments {
  width: 100%;
  padding: 5rem 5.8rem 0 4.45rem;
  &-new {
    display: flex;
    width: 14.5rem;
    align-items: center;
    padding: 0.9rem 1.5rem;
    border: none;
    background: #1621f6;
    border-radius: 2rem;
    color: $white;
    letter-spacing: 0.005em;
    text-transform: uppercase;
    @include subtitle-1;
    @include font-bold;
    span {
      margin-left: 1.7rem;
    }
  }
  &-intro {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &-title {
    color: $black;
    letter-spacing: 0.035em;
    line-height: 26px;
  }
  &-menu {
    padding-top: 2.7rem;
  }
}
</style>
