const baseURL = "https://api.themoviedb.org/3";

const trendingM = document.getElementById("trendingM");
const trendingS = document.getElementById("trendingS");

async function getTrendingM() {
  try {
    const response1 = await fetch(
      "https://api.themoviedb.org/3/trending/movie/day?api_key=a94a0ac2bca639fa00cb5b5a58bf2952 ",
    );
    if (response1.ok) {
      trending = await response1.json();
      trending.results.forEach((movie) => {
        generateCards(movie.title, movie.poster_path, movie.release_date,movie.id,movie.media_type,'trendingM');
      });
    }
  } catch (error) {
    console.log(error);
  }
}

async function getTrendingS() {
  try {
    const response2 = await fetch(
      "https://api.themoviedb.org/3/trending/tv/day?api_key=a94a0ac2bca639fa00cb5b5a58bf2952 ",
    );
    if (response2.ok) {
      trending = await response2.json();
      trending.results.forEach((movie) => {
        generateCards(movie.name, movie.poster_path, movie.first_air_date,movie.id,movie.media_type,'trendingS');
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function generateCards(name, image, date,id,media_type,cara) {
  document.getElementById(`${cara}`).innerHTML = document.getElementById(`${cara}`).innerHTML + `        
            <div class="card1" id='${id}' onclick="window.location.href='./details/index.html?media_type=${media_type}&id=${id}'">
            <div class="card1img" style="background-image: url('https://image.tmdb.org/t/p/w600_and_h900_face/${image}')"></div>
            <a href="">${name}</a>
            <p>${date}</p>
    </div>`;
}

getTrendingM();
getTrendingS();