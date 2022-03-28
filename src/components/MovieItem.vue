<template>
  <RouterLink
    :to="`/movie/${movie.imdbID}`"
    :style="{ backgroundImage: `url(${movie.Poster})` }"
    class="movie">
    <Loader 
      v-if="imageLoading"
      :size="1.5"
      absolute />
    <div class="info">
      <div class="year">
        {{ movie.Year }}
      </div>
      <div class="title">
        {{ movie.Title }}
      </div>
    </div>
  </RouterLink>
</template>

<script>
import Loader from '~/components/Loader'

export default {
  components: {
    Loader
  },
  props: {
    movie: {
      type: Object,
      default: () => ({})   // props의 객체나 배열데이터는 함수로 만들어서 반환해야함      
      // default: function() { { return ~~} }을 화살표로 줄임
    }
  },
  data() {
    return {
      imageLoading: true
    }
  },
  mounted() {
    this.init();    // html구조에 연결된 직후 : mounted / 일반적으론 created 쓰지만 html요소를 다룰 땐 mounted
  },
  methods: {
    async init() {
      const poster = this.movie.Poster
      if (!poster || poster === 'N/A') {
        this.imageLoading = false
      }
      else {
        await this.$loadImage(poster)    // url을 받기때문에 this.movie.Poster를 매개변수로 줌
        this.imageLoading = false
        // () => 화살표함수 사용하면 this는 export default 내의 데이터들
        // function() {} 사용하면 this는 호출되는 위치
      }
      
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/scss/main";

  .movie {
    $width: 200px;
    width: $width;
    height: $width * 3/2;
    margin: 10px;
    border-radius: 4px;
    background-color: $gray-400;
    background-size: cover;   // 더 넓은 너비에 맞춰짐
    overflow: hidden;
    position: relative;
    &:hover::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border: 6px solid $primary
    }
    .info {
      background-color: rgba($black, .3);
      width: 100%;
      padding: 14px;
      font-size: 14px;
      text-align: center;
      position: absolute;
      left: 0;
      bottom: 0;
      backdrop-filter: blur(10px);
      .year {
        color: $primary
      }
      .title {
        color: $white;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
</style>