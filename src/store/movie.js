export default {
  // module! / movie.js가 하나의 store에서 모듈화 되어서 사용될 수 있다고 알려주는 요소
  namespaced: true, 
  // data! / 실제로 취급해야 하는 데이터
  state: function () {   // 리턴만 해서 화살표함수로 축약가능
    return {
      movies: []
    }
  },
  // computed / 계산된 데이터(state)를 만들어내는
  getters: {
    movieIds(state) {
      return state.movies.map(m => m.imdbID)    // map함수로 imdbID값을 뽑아냄
    }
  },
  
  // methods / 함수들 만드는곳
  // 변경되야하는 데이터들은 mutations / 변경필요 없는 데이터들은 actions
  // 변이 / mutations로만 movie.js안의 데이터 변경 가능
  mutations: {
    resetMovies(state) {
      state.movies = []
    }
  },
  // 데이터 직접적 수정 불가, 비동기로 동작
  actions: {
    searchMovies({ state, getters, commit }) {    // state를 바로 불러올 수 없음 -> context.state
      // context.state
      // context.getters
      // context.commit
    }
  }
}