<template>
  <div>{{ movie.Title }}</div>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      default: () => ({})   // props의 객체나 배열데이터는 함수로 만들어서 반환해야함      
      // default: function() { { return ~~} }을 화살표로 줄임
    }
  }
}
</script>