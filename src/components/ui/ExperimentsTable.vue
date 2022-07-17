<template>
  <table class="table">
    <thead class="table-head">
      <tr class="table-head__row">
        <th v-for="(header, index) in tableHeaders" :key="index" class="table-head__item">
          {{ header }}
        </th>
        <th class="action"></th>
      </tr>
    </thead>
    <tbody class="table-body">
      <tr class="table-body__row" v-for="(experiment, index) in experimentsList" :key="index">
        <td
          class="table-body__item"
          v-for="(name, i) in experiment"
          :key="i"
          :class="[name === experiment['status'] ? `${name} status` : '']"
        >
          <template v-if="typeof name === 'string' && name === experiment['status']">
            <component :is="getStatusIcon(name)" />
          </template>
          {{ typeof name === 'string' && name === experiment['date_started'] ? getFormattedDate(name) : name }}
          <base-button v-if="name === experiment['action']" @click="setSelectedActionMenu(index)">
            <action-icon />
            <action-menu v-if="index === selectedActionMenu" @close="setSelectedActionMenu(-1)" />
          </base-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import { defineComponent, PropType, computed, ref } from 'vue'
import { getFormattedDate } from '~/helpers'
import { IExperiment } from '~/services/interfaces'
import {
  finishedIcon,
  startedIcon,
  qa_modeIcon,
  createdIcon,
  pausedIcon,
  archivedIcon,
  ActionIcon,
} from '~/components/icons/index'
import BaseButton from '~/components/form-elements/BaseButton.vue'
import ActionMenu from './ActionMenu.vue'
export default defineComponent({
  components: {
    ActionIcon,
    archivedIcon,
    BaseButton,
    createdIcon,
    finishedIcon,
    qa_modeIcon,
    pausedIcon,
    startedIcon,
    ActionMenu,
  },
  props: {
    tableHeaders: {
      type: Array as PropType<string[]>,
      required: true,
    },
    tableData: {
      type: Array as PropType<IExperiment[]>,
      required: true,
    },
  },
  setup(props) {
    const selectedActionMenu = ref<number | null>(null)

    const getStatusIcon = (name: string): string => {
      return `${name}Icon`
    }

    const setSelectedActionMenu = (id: number): void => {
      selectedActionMenu.value = id
    }

    const experimentsList = computed(() => {
      const list = props.tableData.map((item) => {
        const experiment = { ...item } as Partial<IExperiment>
        delete experiment.region_id
        delete experiment.deleted
        delete experiment.id
        experiment.action = ''
        return experiment
      })
      return list
    })

    return {
      experimentsList,
      getStatusIcon,
      getFormattedDate,
      selectedActionMenu,
      setSelectedActionMenu,
    }
  },
})
</script>
<style lang="scss">
.table {
  overflow: auto;
  width: 100%;
  max-width: 100%;
  border: 1px solid $gray-light;
  border-collapse: collapse;
  table-layout: auto;
  @include screen(custom, max, 576) {
    display: block;
  }
  &-head {
    border-width: 0px 1px 1px 1px;
    border-style: solid;
    border-color: $gray-lighter;
    background: $gray-lighter;
    &__row {
    }
    &__item {
      @include subtitle-2;
      padding: 1.6rem 0 1.7rem 0;
      text-align: left;
      text-transform: uppercase;
      &:first-of-type {
        padding-left: 1.8rem;
      }
    }
  }
  &-body {
    &__row {
      &:nth-child(even) {
        border-width: 1px 0px;
        border-style: solid;
        border-color: $gray-light;
        background: rgba($gray-lightest, 0.5);
      }
    }
    &__item {
      padding: 1.6rem 0 1.3rem 0;
      &:first-of-type {
        padding-left: 1.7rem;
      }
      &.paused {
        color: #f1a146;
      }
      &.qa_mode {
        color: $purple-rain;
      }
      &.finished {
        color: #131728;
      }
      &.created {
        color: #388080;
      }
      &.archive {
        color: #747da2;
      }
      &.started {
        color: #5fcf87;
      }
      &.status {
        display: flex;
        align-items: center;
        text-transform: capitalize;
        svg {
          width: 1.5rem;
          margin-right: 1rem;
        }
      }
      button {
        position: relative;
      }
    }
  }
}
</style>
