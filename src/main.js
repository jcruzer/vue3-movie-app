import { createApp } from 'vue'
import App from './App'
import router from './routes'    
import store from './store'
import loadImage from './plugins/loadImage'
// 특정 폴더 안의 index.js라는 파일을 우선적으로 찾아서 연결함, index.js 생략 가능 원래는 ./routes/index.js
// 폴더에서 가장 기본적으로 사용되는 파일을 만들떄는 index라는 이름 사용 권장

createApp(App)
  .use(router)    // $route, $router 플러그인 라이브러리를 연결할 때 사용
  .use(store)     // $store 플러그인 라이브러리를 연결할 때 사용
  .use(loadImage) // $loadImage 플러그인을 component 어디에서든 사용 가능
  .mount('#app')