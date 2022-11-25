const API_KEY = 'api_key=d98d561ee867c2b1552a3783e05a9d32';
const MAIN_URL = "https://api.themoviedb.org/3";
const POPULAR = MAIN_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';

const main = document.getElementById('main');



// Popularne

function getMovies(url){
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        showMovies(data.results.filter((value, index) => index < 5));
    })
}

function showMovies(data) {
    main.innerHTML = '';
    data.forEach(movie => {
        const {title, poster_path} = movie;
        const movies = document.createElement('div');
        movies.innerHTML = `
        <img src="${IMG_URL + poster_path}">
        <h2>${title}</h2>
        `;
    main.appendChild(movies);
    })
}
getMovies(POPULAR);