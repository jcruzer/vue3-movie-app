import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

// Store의 Mutations 실행할때는 .commit() 메소드
// Store의 Actions 실핼할때는 .dispatch() 메소드 사용

const _defaultMessage = 'Search for the movie title~'

export default {
  // module! / movie.js가 하나의 store에서 모듈화 되어서 사용될 수 있다고 알려주는 요소
  namespaced: true, 
  // data! / 실제로 취급해야 하는 데이터
  state: function () {   // 리턴만 해서 화살표함수로 축약가능
    return {
      movies: [],
      message: _defaultMessage,
      loading: false,
      theMovie: {}
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
      state.message = _defaultMessage
      state.loading = false

    }
  },
  // 데이터 직접적 수정 불가, 비동기로 동작
  // 사용은 dispatch로 호출
  actions: {
    async searchMovies({ state, commit }, payload) {
      if (state.loading) return 
      
      commit('updateState', {
        message: '',
        loading: true
      })
      try {
        // 매개변수 이름은 언제든지 바꿀 수 있음 / 객체구조분해로 context안에 commit만 뽑음 / 2페이지 이상에서 state 사용하려고 추가
        const res = await _fetchMovie({   // 위에 payload에 있는 내용 그대로 사용
          ...payload,
          page: 1
        })

        const { Search, totalResults } = res.data
        commit('updateState', {
          // movies: Search    // 데이터이름 : movies / 할당할 데이터 : Search
          movies: _uniqBy(Search, 'imdbID')   // lodash - uniqBy 이용해서 중복된 객체 제거
        })
        console.log(totalResults)
        console.log(typeof totalResults)    // string

        const total = parseInt(totalResults, 10)  // totalResults가 문자라서 10진수 숫자로 바꿔줌
        const pageLength = Math.ceil(total / 10)

        // 10개 이상의 영화정보가 있어서 페이지 추가 요청 전송
        if (pageLength > 1) {
          for (let page = 2; page <= pageLength; page += 1){
            if (page > (payload.number / 10)) break
            // 1page(omdbapi 1번 긁어오는데)당 10개의 영화정보 뽑아오는데 number로 화면에 몇개까지 표시되나 지정하고 지정된 숫자만큼 표시하게 break 걸어줌 
            const res = await _fetchMovie({
              ...payload,
              //page: page 생략가능
              page
            })
            const { Search } = res.data
            commit('updateState', {
              //movies: Search    // 이렇게 써버리면 1페이지 정보 덮어쓰기 되어버려서 안됨
              movies: [...state.movies, ..._uniqBy(Search, 'imdbID')]    // 전개연산자로 기존 1페이지데이터 + 추가로 요청한 페이지데이터 합침
            })
          }
        }
      //} catch (error){
      } catch ( {message} ){
        // error 객체에서 message라는 데이터만 객체구조분해로 뽑음
        
        // netlify-functions에서 반환하는 메세지 자체는 문자데이터지만(body: error.message) error라는 객체 안에 있는 에러메세지, 실제로 네트워크를 거쳐서 반환되기 때문에(객체 -> 문자) ?? 몬말
        commit('updateState', {
          // message: message
          movies: [],   // 에러 발생 시 초기화
          //message: error.message
          message
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      } 
    },
    async searchMovieWithId({state, commit}, payload) {
      // context.state / context.commit 사용하기 불편해서 객체구조분해로 context -> {state, commit}
      if (state.loading) return
      commit('updateState', {
        theMovie: {},   // 잠깐 이전 영화정보가 뜰 수도 있어서 초기화
        loading: true
      })
      try {
        const res = await _fetchMovie(payload)
        commit('updateState', {
          theMovie: res.data
        })
      } catch(error) {
        commit('updateState', {
          theMovie: {}
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    }
  }
}


async function _fetchMovie(payload) {  // 현재 파일에서만 사용되는 함수라 앞에 _씀
  /*
function _fetchMovie(payload) {  // 현재 파일에서만 사용되는 
  const { title, type, year, page, id } = payload
  const OMDB_API_KEY = '7035c60c'
  const url = id
  ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
  : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
  // omdb에서 url등의 오류가 있어도 catch로 안가고 then으로 가서 실행 -> 예외처리 필요
  
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(res => {
        if(res.data.Error) {
        reject(res.data.Error)
        }
        resolve(res)
      })
      .catch(err => {
        reject(err.message)
      })
  })
  */
  // netlify - functions 사용하면서 functions-movie.js로 이동
  return await axios.post('/.netlify/functions/movie', payload)
  // get대신 post를 쓴 이유 : get은 쿼리스트링(?title="~~") 사용했는데 post는 body라는 속성에 담아서 payload라는 인수로 전달
} 