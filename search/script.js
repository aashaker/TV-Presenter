const baseURL = "https://api.themoviedb.org/3";

const trendingM = document.getElementById("trendingM");
const trendingS = document.getElementById("trendingS");
const searchbar = document.getElementById("searchbar");
const urlParams = new URLSearchParams(window.location.search);

const query = urlParams.get('query');
searchbar.value = query

async function getSearch() {
  try {
    const response1 = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=a94a0ac2bca639fa00cb5b5a58bf2952&query=${query}`)
          if (response1.ok) {
      data = await response1.json();
      console.log(`https://api.themoviedb.org/3/search/multi?api_key=a94a0ac2bca639fa00cb5b5a58bf2952&query=${query}`)
      data.results.forEach((result) => {
        if(result.media_type=="movie"){
           generateCards(result.title, result.poster_path, result.release_date,result.id,result.media_type);
        }
        else{
           generateCards(result.name, result.poster_path, result.first_air_date,result.id,result.media_type);
        }
       
      });
    }
  } catch (error) {
    console.log(error);
  }
}


function generateCards(name, image, date,id,media_type) {
  document.getElementById(`trendingM`).innerHTML = document.getElementById(`trendingM`).innerHTML + `        
            <div class="card1" id='${id}' onclick="window.location.href='../details/index.html?media_type=${media_type}&id=${id}'">
            <div class="card1img" style="background-image: url('https://image.tmdb.org/t/p/w600_and_h900_face/${image}')"></div>
            <a href="">${name}</a>
            <p>${date}</p>
    </div>`;
}
getSearch()

searchbar.onchange=()=>{
  let encodedQuery = encodeURIComponent(searchbar.value)
console.log(encodedQuery)
  window.location.href=`../search/index.html?query=${encodedQuery}`
}