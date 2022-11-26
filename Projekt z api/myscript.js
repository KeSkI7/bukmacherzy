const API_KEY = 'api_key=d98d561ee867c2b1552a3783e05a9d32';
const MAIN_URL = "https://api.themoviedb.org/3";
const POPULAR = MAIN_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const search_URL = MAIN_URL + '/search/movie?' + API_KEY;
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search_bar');


// Popularne

function getMovies(url){
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        showMovies(data.results);
    })
}

function showMovies(data) {
    main.innerHTML = '';
    data.forEach(movie => {
        const {title, poster_path} = movie;
        const movies = document.createElement('div');
        movies.classList.add('movie');
        movies.innerHTML = `
        <img src="${IMG_URL + poster_path}">
        <h2 class="title">${title}</h2>
        `;
    main.appendChild(movies);
    })
}
getMovies(POPULAR);

form.addEventListener('submit', (e) =>{
    e.preventDefault();

    const searchForm = search.value;
    if (searchForm) {
        getMovies(search_URL+'&query='+searchForm)
    }
    else{
        showMovies(POPULAR)
    }
})

// Strona filmu