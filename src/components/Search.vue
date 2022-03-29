<template>
  <div class="container">
    <input
      v-model="title"
      class="form-control"
      type="text"
      placeholder="Search for Movies, Series & more"
      @keyup.enter="apply" />
      
    <div class="selects">
      <select
        v-for="filter in filters"
        v-model="$data[filter.name]"
        :key="filter.name"
        class="form-select">
        <option
          v-if="filter.name === 'year'"
          value="">
          All Years
        </option>
        <option
          v-for="item in filter.items"
          :key="item">
          {{ item }}
        </option>
      </select>
    </div>
    <button
      class="btn btn-primary"
      @click="apply">
      Apply
    </button>
  </div>
</template>
// v-model : 양방향 데이터 바인딩
// class="form-control" : bootstrap에서 제공하는 폼 양식
// v-model="$data" 사용하면 script부분의 data에 접근 가능
// v-model="$data[filter.name]" / for문으로 반복되는 data 안의 filter의 name을 각 select의 data로 입력
// v-for="item in filter.items" / for문은 select에서 먼저 돌고 있어서 거기서 사용하는 filter라는 데이터를 요소?로 사용함 그 안에 items이란 데이터 적용
// option value="" value값 비워두고 option 태그 안에 값을 써주면 default로 선택되어있는거와 같은 효과?

<script>

export default {
  data() {
    return {
      title: '',
      type: 'movie',
      number: 10,
      year: '',
      filters: [
        {
          name: 'type',
          items: ['movie', 'series', 'episode']
        },
        {
          name: 'number',
          items: [10, 20, 30]
        },
        {
          name: 'year',
          items: (function () {
            const years = []
            const thisYear = new Date().getFullYear()   // 2022
            for (let i = thisYear; i >= 1985; i -= 1) {
              years.push(i)
            }
            return years
          })()  // 첫번째 함수를 선언과 동시에 선언(즉시실행함수, function () - =>로 변경 가능)
        }
      ]
    }
  },
  methods: {
    async apply() {   // 비동기로 요청해야 하기 때문에 async (데이터처리하는데 시간이 걸려서)
      // Search movies...

      // movie라는 이름은 store/index.js에서 지정한 이름 -> hello: movie로 바뀌면 경로도 hello/searchMovies로 변경되야함
      this.$store.dispatch('movie/searchMovies', {
        // v-model로 위에서 연결된 filters의 데이터들을 사용할 수 있게 this로 연결해서 store의 searchMovies actions에 전달
        title: this.title,
        type: this.type,
        number: this.number,
        year: this.year
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  > * {   // container의 모든 자식요소 선택자
    margin-right: 10px;
    font-size: 15px;
    &:last-child {
      margin-right: 0px;  // 마지막 요소 우측 여백 삭제
    }
  }
  .selects {
    display: flex;
    select {
      width: 120px;
      margin-right: 10px;
      &:last-child {
        margin-right: 0px;
      }
    }
  }
  .btn {
    width: 120px;
    height: 50px;
    font-weight: 700;
    flex-shrink: 0;   // 가로너비가 지정된 너비보다 줄어드는것을 방지
  }
  
  @include media-breakpoint-down(lg) {
    display: block;   // Large 사이즈보다 작아지면 display: flex(수평) -> block(수직)
    input {
      margin-right: 0;
      margin-bottom: 10px;
    }
    .selects {
      margin-right: 0;
      margin-bottom: 10px;
      select {
        width: 100%;
      }
    }
    .btn {
      width: 100%;
    }
  }
}
</style>