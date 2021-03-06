import { createRouter, createWebHashHistory} from 'vue-router'
import Home from './Home'
import Movie from './Movie'
import About from './About'
import NotFound from './NotFound'


export default createRouter({
  // Hash모드, History모드 사용 가능
  // https://google.com/#/search 저런식으로 #/ 사용, 지정된페이지 아닐때 404에러페이지 띄우려고 사용
  history: createWebHashHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  // routes는 각 page들을 말함
  routes: [
    {
      path: '/',      // /는 메인페이지를 의미
      component: Home   // 그 페이지에 접근했을 때 실행되는 컴포넌트
    },
    {
      path: '/movie/:id',
      component: Movie
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/:notFound(.*)',    // 파라미터 이름(pathMatch은 기본이름)은 바꿔도됨 .* = 모든경로 일치
      component: NotFound
    }
  ]
})