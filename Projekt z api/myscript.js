const API_KEY = 'api_key=d98d561ee867c2b1552a3783e05a9d32';
const MAIN_URL = "https://api.themoviedb.org/3";
const POPULAR = MAIN_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const search_URL = MAIN_URL + '/search/movie?' + API_KEY;
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search_bar');
const content = document.getElementById('content');

// Popularne


function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        showMovies(data.results);
    })
}

function showMovies(data) {
    main.innerHTML = '';
    data.forEach(movie => {
        const { title, poster_path, id } = movie;
        const movies = document.createElement('div');
        movies.classList.add('movie');
        movies.innerHTML = `
        <img src="${IMG_URL + poster_path}">
        <h2 class="title">${title}</h2>
        `;
        movies.onclick = () => moviePage(id);
        main.appendChild(movies);
    })
}
getMovies(POPULAR);

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchForm = search.value;
    if (searchForm) {
        getMovies(search_URL + '&query=' + searchForm)
    }
    else {
        showMovies(POPULAR)
    }
})


// Strona filmu
const moviePage = (id) => {
    content.innerHTML = "";
    console.log(id);
    fetch(MAIN_URL + '/movie/' + id + '?' + API_KEY)
        .then(res => res.json()).then(data => {
            console.log(data);
            const { title, poster_path, release_date, overview } = data;
            const movies2 = document.createElement('div');
            movies2.classList.add('elements');
            movies2.innerHTML = `
        <h2 class="title">${title}</h2>
        <img class="in-movie" src="${IMG_URL + poster_path}">
        <h2 class="tag">Overview</h2>
        <div class="overview">${overview}</div>
       <p class="relase">Data wydania: ${release_date}</p>
        `;
            content.appendChild(movies2);
        })
}
