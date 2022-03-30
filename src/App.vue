<template>
  <Header />
  <RouterView />
  <Footer />
</template>
    // 페이지들은 이 RouterView 영역에서 출력

<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'

export default {
  components: {
    Header,
    Footer
  }
}
</script>