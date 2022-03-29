exports.handler = async function (event, context) {
  return {
    statusCode: 200,  // 정상적인 응답
    body: JSON.stringify({    // 문자데이터 할당, 복잡해지면 객체로
      name: 'mandue',
      age: 20
    })
  }
}