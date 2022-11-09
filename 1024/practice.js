// ;(즉시 실행할 함수)()  / (() => {즉시 실행할 함수})()
// async 함수 내에서 await 키워드를 사용함 

;(async () => {
  // 초기화
  const moviesEl = document.querySelector('.movies')
  const actionsEl = document.querySelector('.actions')
  const moreBtnEl = document.querySelector('.btn')  
  let page = 1
  // let maxPage
  // 여기서 movies가 정의되야 밑의 movies가 사용될 수 있다.
  // Promise 객체가 반환되는 곳에는 앞에 await 키워드를 사용해줘야 한다 !
  // 처음 영화 정보 렌더링
  const movies = await callMovies()
  page += 1
  renderMovies(movies)

  // 더보기 버튼 클릭
  moreBtnEl.addEventListener('click', async () => {
    const movies = await callMovies(page)
    page += 1
    renderMovies(movies)
  })  

  // page 매개변수 옆에 = 1로 1을 기본값으로 설정
  async function callMovies( page = 1) {
    // if(page >= maxPage) {
    //   // 더보기 버튼 사라짐
    //   actionsEl.removeChild(moreBtnEl)
      
    // } else {    
    const res = await fetch( `https://omdbapi.com/?apikey=7035c60c&s=frozen&page=${page}` ) 
    const { Search: movies, totalResults } = await res.json()
    console.log(movies)
    maxPage = Math.ceil(Number(totalResults / 10))
    return movies
  }
  function renderMovies(movies) {
    for (const movie of movies) {
      const el = document.createElement('div')
      el.classList.add('movie')
      el.innerHTML = /* html */ `
        <h1>${movie.Title}</h1>
        <img src="${movie.Poster}" alt="Movie Poster" />
      `
      moviesEl.append(el)
    }
  }}
})()
