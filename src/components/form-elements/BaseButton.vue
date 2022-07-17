<template>
  <button v-bind="$attrs" v-on="$listeners" type="button">
    <slot />
  </button>
</template>
