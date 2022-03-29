const axios = require('axios')

exports.handler = async function (event) {
  console.log(event)
  const payload = JSON.parse(event.body)    // 문자데이터로 변환해서 주고받는데 그걸 다시 객체데이터로 변환
  const { title, type, year, page, id } = payload
  const OMDB_API_KEY = '7035c60c'
  const url = id
  ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
  : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
  // omdb에서 url등의 오류가 있어도 catch로 안가고 then으로 가서 실행 -> 예외처리 필요
  
  try {
    const { data } = await axios.get(url)   // res.data
    if (data.Error) {
      return {
        statusCode: 400,    // 잘못된 요청처리에 대한 에러코드
        body: data.Error    // 이미 문자 데이터
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify(data)  // 객체 -> 문자 데이터 변환
    }
  } catch (error) {
    return {
      statusCode: error.response.status,
      body: error.message
    }
  }

  /*
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
}