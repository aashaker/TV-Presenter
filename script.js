const baseURL = "https://api.themoviedb.org/3";

const trendingM = document.getElementById("trendingM");

async function getTrendingM() {
  try {
    const response1 = await fetch(
      "https://api.themoviedb.org/3/trending/movie/day?api_key=a94a0ac2bca639fa00cb5b5a58bf2952 ",
    );
    if (response1.ok) {
      trending = await response1.json();
      trending.results.forEach((movie) => {
        generateCards(movie.title, movie.poster_path, movie.release_date,movie.id,movie.media_type);
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function generateCards(name, image, date,id,media_type) {
  trendingM.innerHTML = trendingM.innerHTML + `        
            <div class="card1" id='${id}' onclick="window.location.href='./details/index.html?media_type=${media_type}&id=${id}'">
            <div class="card1img" style="background-image: url('https://image.tmdb.org/t/p/w600_and_h900_face/${image}')"></div>
            <a href="">${name}</a>
            <p>${date}</p>
    </div>`;
}

getTrendingM();