interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}


const inputEl = document.querySelector('input') as HTMLInputElement
const buttonEl = document.querySelector('button') as HTMLButtonElement
const movieListEl = document.querySelector('.movie-list') as HTMLDivElement
const observerEl = document.querySelector('.observer') as HTMLDivElement
const loaderEl = document.querySelector('.loader') as HTMLDivElement

let currentPage = 1
let totalPage = 1

inputEl.addEventListener('keydown', event => {
  if(event.key === 'Enter' && !event.isComposing) {
    searchMovies(inputEl.value)
  }
})
buttonEl.addEventListener('click', () => {
  searchMovies(inputEl.value)
})

// io를 활용한 무한스크롤
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    // 화면 안으로 들어올 때
    if(currentPage >= totalPage) {
      hideLoader()
      return
    }
    if(entry.isIntersecting) {
      searchMovies(inputEl.value, currentPage + 1)
    }   
  })
})
io.observe(observerEl)

async function getMovies(title: String, page: number) {
  const res = await fetch(`https://omdbapi.com/?apikey=7035c60c&s=${title}&page=${page}`)
  return await res.json()
}
async function searchMovies(title: String, page = 1) {
  hideObserver()
  const { Search, totalResults } = await getMovies(title, page)
  if(page === 1) {
    movieListEl.innerHTML = ''
    showLoader()
  }
  currentPage = page
  totalPage = Math.ceil(Number(totalResults) / 10)

  Search.forEach((movie: Movie) => {
    const movieEl = document.createElement('div')
    movieEl.classList.add('movie-item')
    movieEl.innerHTML = /* html */ `
      <div class="poster" style="background-image: url(${movie.Poster});"></div>
      <h3>${movie.Title}</h3>
      `
      movieListEl.append(movieEl)
  })
  showObserver()
}
function showObserver() {
  observerEl.style.display = 'block'
}
function hideObserver() {
  observerEl.style.display = 'none'
}
function showLoader() {
  loaderEl.style.display = 'block'
}
function hideLoader() {
  loaderEl.style.display = 'none'
}

