// plugin으로 만들어서 다른 components에서도 사용 가능하게
export default {
  install(app) {
    app.config.globalProperties.$loadImage = src => {
      return new Promise(resolve => {
        // 로드 완료되면 함수실행 / load가 완료되었다는 정보를 밖으로 내보내기 위해 Promise 생성자로 결과 리턴
        const img = document.createElement('img') // img 엘리멘트(요소)를 생성해서 메모리에 저장, 이벤트체크 가능
        img.src = src
        img.addEventListener('load', () => {
          // 이미지 로드 완료
          resolve()
        })
      })
    }
  }
}