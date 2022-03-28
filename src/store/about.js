export default {
  namespaced: true,   // 모듈이 독립적으로 재사용되기를 원할때
  state: () => ({    // 데이터의 불변성을 위해 state는 함수로 만들어 줘야함
    name: 'MAN-DUE',
    email: 'mandue@mandue.com',
    blog: 'github.com/jcruzer',
    phone: '+82-10-1234-5678',
    image: '../assets/logo.png'
  })
}