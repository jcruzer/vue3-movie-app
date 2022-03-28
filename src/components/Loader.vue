<template>
  <div
    :style="{
      width: `${size}rem`,
      height: `${size}rem`,
      zIndex
    }"
    :class="{
      absolute,
      fixed
    }"
    class="spinner-border text-primary"></div>
</template>
// :class="{ absolute: absolute, fixed: fixed}" -> :class="{ absolute, fixed }" 변경가능
// 'z-index': zIndex -> zIndex: zIndex -> zIndex 변경 가능
<script>
export default {
  props: {
    size: {
      type: Number,
      default: 2
    },
    absolute: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.spinner-border {
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  &.absolute {
    position: absolute;
  }
  &.fixed {
    position: fixed;
  }
}
</style>