const baseURL = "https://api.themoviedb.org/3";
const api_key= 'a94a0ac2bca639fa00cb5b5a58bf2952';
const urlParams = new URLSearchParams(window.location.search);
const thingID = urlParams.get('id');
const thingTYPE = urlParams.get('media_type');
console.log(thingID);

const trendingM = document.getElementById("trendingM");

async function getdata() {
  try {
    const response1 = await fetch(
      `https://api.themoviedb.org/3/${thingTYPE}/${thingID}?api_key=${api_key}`,
    );
    if (response1.ok) {
      trending = await response1.json();
      trending.results.forEach((movie) => {
        generateCards(movie.title, movie.poster_path, movie.release_date,movie.id);
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function generateCards(name, image, date,id) {
  trendingM.innerHTML = trendingM.innerHTML + `        
            <div class="card1" id='${id}' onclick="window.location.href='./details/index.html?id=${id}'">
            <div class="card1img" style="background-image: url('https://image.tmdb.org/t/p/w600_and_h900_face/${image}')"></div>
            <a href="">${name}</a>
            <p>${date}</p>
    </div>`;
}


getdata();
