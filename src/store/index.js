import { createStore } from 'vuex'
import movie from './movie'
import about from './about'

export default createStore ({
  modules: {
    movie: movie,
    about   // 데이터랑 이름이랑 가으면 뒤에 생략 가능
  }
})