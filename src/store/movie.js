import axios from 'axios'

// Store의 Mutations 실행할때는 .commit() 메소드
// Store의 Actions 실핼할때는 .dispatch() 메소드 사용

export default {
  // module! / movie.js가 하나의 store에서 모듈화 되어서 사용될 수 있다고 알려주는 요소
  namespaced: true, 
  // data! / 실제로 취급해야 하는 데이터
  state: function () {   // 리턴만 해서 화살표함수로 축약가능
    return {
      movies: [],
      message: '',
      loading: false
    }
  },
  // computed / 계산된 데이터(state)를 만들어내는
  getters: {
  },
  
  // methods / 함수들 만드는곳
  // 변경되야하는 데이터들은 mutations / 변경필요 없는 데이터들은 actions
  // 변이 / mutations로만 movie.js안의 데이터 변경 가능
  mutations: {
    updateState(state, payload) {
      // ['movies', 'message', 'loading']
      Object.keys(payload).forEach(key => {
        // 위의 payload로 받은 객체를 배열로 만들고 key(각 키이름)으로 매개변수 접근
        //state.movies = payload.movies
        //state['movies'] = payload['movies']
        state[key] = payload[key]
      })
    },
    resetMovies(state) {
      state.movies = []
    }
  },
  // 데이터 직접적 수정 불가, 비동기로 동작
  actions: {
    async searchMovies({ commit }, payload) {    // 매개변수 이름은 언제든지 바꿀 수 있음 / 객체구조분해로 context안에 commit만 뽑음
      // context.mutations 머 이런식으로 사용여기서 최상위구조인듯
      const { title, type, number, year } = payload   // Store에서 받은 정보를 객체구조분해해서 사용
      const OMDB_API_KEY = '7035c60c'

      const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`) // https로 수정
      const { Search, totalResults } = res.data
      commit('updateState', {
        movies: Search,    // 데이터이름 : movies / 할당할 데이터 : Search

      })
    }
  }
}