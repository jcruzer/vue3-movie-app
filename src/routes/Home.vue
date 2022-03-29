<template>
  <Headline />
  <Search />
  <MovieList />
</template>
// vue.js는 부모-자식 간 데이터 공유(Props, Emits) / 상위-하위 간 데이터 공유(Provide, Inject) / 형제-형제간 데이터 제공은 안됨 -> VueX라는 라이브러리 사용

<script>
import Headline from '~/components/Headline'
import Search from '~/components/Search'
import MovieList from '~/components/MovieList'

export default {
  components: {
    Headline,
    Search,
    MovieList
  },
  created() {
    this.$store.commit('movie/resetMovies')
  }
}
</script>