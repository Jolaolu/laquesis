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
        <base-select-box v-if="regions" :has-border="true" :select-box-items="regions" />
      </div>
      <div class="experiments-filters">
        <div class="filters-team">
          <base-select-box default="TEAM" :select-box-items="getArray(teamSet)" />
        </div>
        <div class="filters-status">
          <base-select-box default="STATUS" :select-box-items="getArray(statusSet)" />
        </div>
        <div class="filters-platform">
          <base-select-box default="PLATFORM" :select-box-items="getArray(platformSet)" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import BaseButton from '~/components/form-elements/BaseButton.vue'
import PlusIcon from '~/components/icons/PlusIcon.vue'
import BaseSelectBox from '~/components/form-elements/BaseSelectBox.vue'
import { experimentRegions, experimentData } from '~/services/index'
import { IRegion, IExperiment } from '~/services/interfaces'
import { paginate, getArray } from '~/helpers/index'

export default defineComponent({
  components: { BaseButton, PlusIcon, BaseSelectBox },
  setup() {
    const regions = ref<IRegion[] | null>(null)
    const experimentsList = ref<IExperiment[]>([])
    const tableHeaders = ref<string[]>([])
    const pageNumber = ref<number>(1)
    const perPage = ref<number>(20)
    const platformSet = ref<Set<string>>(new Set())
    const teamSet = ref<Set<string>>(new Set())
    const statusSet = ref<Set<string>>(new Set())

    const getHeaders = (): void => {
      tableHeaders.value = Object.keys(experimentData[0])
    }

    const fetchData = (perPage: number, pageNumber: number): void => {
      experimentsList.value = paginate(perPage, pageNumber, [...experimentData])
      getFilters(experimentData)
    }

    const getFilters = (experimentData: IExperiment[]): void => {
      experimentData.forEach((i) => {
        platformSet.value.add(i.team)
        teamSet.value.add(i.status)
        statusSet.value.add(i.platform)
      })
    }

    watch(pageNumber, (newVal) => {
      fetchData(perPage.value, newVal)
    })

    watch(perPage, (newVal) => {
      fetchData(newVal, pageNumber.value)
    })

    onMounted(() => {
      regions.value = experimentRegions
      fetchData(perPage.value, pageNumber.value)
      getHeaders()
    })
    return {
      getArray,
      platformSet,
      regions,
      statusSet,
      tableHeaders,
      teamSet,
    }
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
    display: flex;
    justify-content: space-between;
    padding-top: 2.7rem;
  }
  &-filters {
    display: flex;
    & .selectbox-text {
      color: $gray-black;
    }
  }
}
</style>
