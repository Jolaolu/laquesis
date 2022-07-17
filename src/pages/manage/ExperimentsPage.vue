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
        <base-select-box
          v-if="regions"
          default-item="Select Region"
          :has-border="true"
          :select-box-items="regions"
          @selected-item="setSelectedRegion"
        />
      </div>
      <div class="experiments-filters">
        <p>Filter by</p>
        <div class="filters-team">
          <base-select-box
            is-filter
            :default-item="filters.Team"
            :select-box-items="getArray(teamSet)"
            @selected-item="setFilters($event, filters.Team)"
          />
        </div>
        <div class="filters-status">
          <base-select-box
            is-filter
            :default-item="filters.Status"
            :select-box-items="getArray(statusSet)"
            @selected-item="setFilters($event, filters.Status)"
          />
        </div>
        <div class="filters-platform">
          <base-select-box
            is-filter
            :default-item="filters.Platform"
            @selected-item="setFilters($event, filters.Platform)"
            :select-box-items="getArray(platformSet)"
          />
        </div>
      </div>
    </div>
    <div class="experiments-table">
      <ul class="filters">
        <li v-for="(filter, index) in appliedFilters" :key="index">
          <base-button class="applied">
            <span>
              {{ filter }}
            </span>
            <cancel-icon @click.native="removeFilter(filter)" />
          </base-button>
        </li>
      </ul>
      <experiments-table :table-headers="tableHeaders" />
    </div>
    <div class="experiments-pagination">
      <base-pagination
        :total-length="totalLengthOfData"
        :page-from="pageFrom"
        :page-to="pageTo"
        @per-page="perPage = convertToNumber($event)"
      />
    </div>
  </div>
</template>
<script lang="ts">
import Vue, { defineComponent, onMounted, ref, watch, computed } from 'vue'
import { experimentRegions, experimentData } from '~/services/index'
import { IRegion, IExperiment, IFilterList } from '~/services/interfaces'
import { paginate, getArray, convertToNumber, combineArrays } from '~/helpers/index'
import BasePagination from '~/components/ui/BasePagination.vue'
import BaseButton from '~/components/form-elements/BaseButton.vue'
import PlusIcon from '~/components/icons/PlusIcon.vue'
import BaseSelectBox from '~/components/form-elements/BaseSelectBox.vue'
import CancelIcon from '~/components/icons/CancelIcon.vue'
import ExperimentsTable from '~/components/ui/ExperimentsTable.vue'

export enum dataFilters {
  Team = 'TEAM',
  Platform = 'PLATFORM',
  Status = 'STATUS',
}
export default defineComponent({
  components: {
    BaseButton,
    PlusIcon,
    BaseSelectBox,
    BasePagination,
    CancelIcon,
    ExperimentsTable,
  },
  setup() {
    const regions = ref<IRegion[] | null>(null)
    const tableHeaders = ref<string[]>([])
    const pageNumber = ref<number>(1)
    const perPage = ref<number>(10)
    const platformSet = ref<Set<string>>(new Set())
    const teamSet = ref<Set<string>>(new Set())
    const statusSet = ref<Set<string>>(new Set())
    const filtersList = ref<IFilterList>({})
    const selectedRegion = ref<IRegion | null>(null)
    const filteredData = ref<IExperiment[]>([])

    const getHeaders = (): void => {
      const toBeRemoved = ['id', 'deleted', 'region_id']
      Object.keys(experimentData[0]).reduce((acc, header: string) => {
        if (!toBeRemoved.includes(header)) {
          tableHeaders.value.push(header.split('_').join(' '))
        }
        return acc
      }, [])
    }

    const setSelectedRegion = (region: IRegion): void => {
      selectedRegion.value = region
      console.log(region)
    }

    const getFilters = (experimentData: IExperiment[]): void => {
      experimentData.forEach((i) => {
        platformSet.value.add(i.team)
        teamSet.value.add(i.status)
        statusSet.value.add(i.platform)
      })
    }

    const setFilters = ($event: string, type: dataFilters): void => {
      if (type in filtersList.value) {
        if (filtersList.value[type].includes($event)) {
          return
        }
        filtersList.value[type].push($event)
      } else {
        Vue.set(filtersList.value, type, [])
        filtersList.value[type].push($event)
      }
    }

    const removeFilter = (filter: string): void => {
      const filterValues = Object.values(filtersList.value)
      Object.keys(filtersList.value).forEach((_, index) => {
        if (filterValues[index].includes(filter)) {
          const position = filterValues[index].indexOf(filter)
          if (position > -1) {
            filterValues[index].splice(position, 1)
          }
        }
      })
    }

    const totalLengthOfData = computed(() => filteredData.value.length)
    const appliedFilters = computed(() => combineArrays(Object.values(filtersList.value)))
    const pageTo = computed(() => Math.min(pageFrom.value + perPage.value - 1, totalLengthOfData.value))
    const pageFrom = computed(() => pageNumber.value * perPage.value - (perPage.value - 1) || 1)
    const experimentsList = computed(() => paginate(perPage.value, pageNumber.value, [...filteredData.value]))

    watch(
      selectedRegion,
      (newVal) => {
        filteredData.value = experimentData.filter((experiment) => experiment.region_id === newVal?.id)
        getFilters(experimentsList.value)
      },
      { immediate: true }
    )

    onMounted(() => {
      filteredData.value = experimentData
      regions.value = experimentRegions
      getHeaders()
    })
    return {
      appliedFilters,
      combineArrays,
      convertToNumber,
      filters: dataFilters,
      filtersList,
      getArray,
      pageFrom,
      pageNumber,
      pageTo,
      perPage,
      platformSet,
      regions,
      removeFilter,
      selectedRegion,
      statusSet,
      setFilters,
      setSelectedRegion,
      tableHeaders,
      teamSet,
      totalLengthOfData,
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
    align-items: center;
    p {
      margin-right: 2rem;
      color: $gray-light;
    }
    & .selectbox-text {
      color: $gray-black;
    }
    & .selectbox-menu > li > button {
      text-transform: capitalize;
    }
  }
  &-pagination {
    display: flex;
    justify-content: flex-end;
  }
  &-table {
    .filters {
      display: flex;
      padding: 2rem 0;
    }
    .applied {
      display: flex;
      width: 10rem;
      @include caption;
      align-items: center;
      justify-content: space-between;
      padding: 0.4rem 0.8rem;
      margin-right: 1rem;
      background-color: $gray-lighter;
      border-radius: 1.8rem;
      color: $gray-darkest;
      text-overflow: ellipsis;
      text-transform: capitalize;
      span {
        margin-right: 1rem;
      }
    }
  }
}
</style>
