<template>
  <div class="container">
    <div class="inner">
      <MovieItem
        v-for="movie in movies"
        :key="movie.imdbID"
        :movie="movie" />
    </div>
  </div>
</template>

// computed에서 리턴된 배열 movies를 v-for문으로 돌려서 그안에서 사용하는 인자 movie
// :key로는 고유한값인 movie.imdbID
// :movie 라는 props 이름으로 자식(MovieItem)에게 v-for문 돌고있는 movie 데이터를 전달
<script>
import MovieItem from '~/components/MovieItem'

export default {
  components: {
    MovieItem
  },
  computed: {
    movies() {
      return this.$store.state.movie.movies
      // this.$store로 store 접근해서 state 중에 movie 모듈안에 movies라는 데이터 리턴
    }
  }
}
</script>