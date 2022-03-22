<template>
  <Header />
  <RouterView />
</template>
    // 페이지들은 이 RouterView 영역에서 출력

<script>
import Header from '~/components/Header'
export default {
  components: {
    Header
  }
}
</script>

<style lang="scss">
@import "~/scss/main";
</style>