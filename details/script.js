const baseURL = "https://api.themoviedb.org/3";
const api_key= 'a94a0ac2bca639fa00cb5b5a58bf2952';
const urlParams = new URLSearchParams(window.location.search);
const thingID = urlParams.get('id');
const thingTYPE = urlParams.get('media_type');
const caraCAST = document.getElementById("caraCAST");
const banner = document.querySelector(".bannerIMG");
const posterIMG = document.querySelector(".posterIMG");
const thingName = document.querySelector("#thingName");
const creators = document.querySelector("#creators");
const score = document.querySelector("#score");
const scoreP = document.querySelector("#score p");
const phrase = document.querySelector("#phrase");
const overView = document.querySelector("#overView");
const genras = document.querySelector("#genras");
const playBtn = document.getElementById("playbtn");
const trailerModal = document.getElementById("trailerModal");
const closeTrailerModal = document.getElementById("closeTrailerModal");
const trailerFrame = document.getElementById("trailerFrame");
const episodesSection = document.getElementById("episodesSection");
const seasonsList = document.getElementById("seasonsList");
let creditsType = 0;
let trailerKey = null;
let seasonDetailsData = [];
let seasonDisplayCounts = [];

if(thingTYPE=='tv'){
  creditsType = 'aggregate_credits';
  getinfoS();
}else{
  creditsType = 'credits'
  getinfoM();
}

function openTrailerModal() {
  if(!trailerKey){
    alert("No trailer is available for this title yet.");
    return;
  }

  trailerFrame.src = `https://www.youtube.com/embed/${trailerKey}?autoplay=1`;
  trailerModal.classList.remove("hidden");
  trailerModal.setAttribute("aria-hidden", "false");
}

function closeTrailerModalHandler() {
  trailerFrame.src = "";
  trailerModal.classList.add("hidden");
  trailerModal.setAttribute("aria-hidden", "true");
}

playBtn.onclick = openTrailerModal;
playBtn.onkeydown = (event) => {
  if(event.key === "Enter" || event.key === " "){
    event.preventDefault();
    openTrailerModal();
  }
};
closeTrailerModal.onclick = closeTrailerModalHandler;
trailerModal.onclick = (event) => {
  if(event.target === trailerModal){
    closeTrailerModalHandler();
  }
};

async function getinfoS() {
  try {
    const response1 = await fetch(
      `https://api.themoviedb.org/3/${thingTYPE}/${thingID}?api_key=${api_key}`
    );
    console.log(`https://api.themoviedb.org/3/${thingTYPE}/${thingID}?api_key=${api_key}`)
    if (response1.ok) {
      const data = await response1.json();

      banner.style.backgroundImage=`url(https://image.tmdb.org/t/p/w600_and_h900_face/${data.backdrop_path})`
      posterIMG.style.backgroundImage=`url(https://image.tmdb.org/t/p/w600_and_h900_face/${data.poster_path})`
      thingName.innerHTML=data.name
      phrase.innerHTML=`"" ${data.tagline}""`
      overView.innerHTML =data.overview
      let genrasARR=data.genres
      let genrasTXT=`${data.first_air_date} ⦿ ${data.genres[0].name}`
      for (let i = 1;i < genrasARR.length;i++){
      genrasTXT += `, ${genrasARR[i].name}`
        }
        genras.innerHTML=genrasTXT
              const creatorsTXT = data.created_by
      creatorsTXT.forEach(creator=>{
        generateCreators(creator.name,"creator",creator.id);
      })
      generateScore(data.vote_average)
      loadEpisodesSection(data)
    }
            
  } catch (error) {
    console.log(error);
  }
}

async function getinfoM() {
  try {
    const response1 = await fetch(
      `https://api.themoviedb.org/3/${thingTYPE}/${thingID}?api_key=${api_key}`
    );
    console.log(`https://api.themoviedb.org/3/${thingTYPE}/${thingID}?api_key=${api_key}`)
    if (response1.ok) {
      const data = await response1.json();

      banner.style.backgroundImage=`url(https://image.tmdb.org/t/p/w600_and_h900_face/${data.backdrop_path})`
      posterIMG.style.backgroundImage=`url(https://image.tmdb.org/t/p/w600_and_h900_face/${data.poster_path})`
      thingName.innerHTML=data.title
      phrase.innerHTML=`"" ${data.tagline}""`
      overView.innerHTML =data.overview
      let genrasARR=data.genres
      let genrasTXT=`${data.release_date} ⦿ ${data.genres[0].name}`
      for (let i = 1;i < genrasARR.length;i++){
      genrasTXT += `, ${genrasARR[i].name}`
        }
      const hours = Math.floor(data.runtime/60)
      const mineuts= data.runtime % 60
      genrasTXT = `${genrasTXT} ⦿ ${hours}h ${mineuts}m `;
      genras.innerHTML=genrasTXT
              generateScore(data.vote_average)
    
    }
  } catch (error) {
    console.log(error);
  }
}


  async function  getcast()  {

  try {
    const response1 = await fetch(
      
      `https://api.themoviedb.org/3/${thingTYPE}/${thingID}/${creditsType}?api_key=a94a0ac2bca639fa00cb5b5a58bf2952`
    );
    console.log( `https://api.themoviedb.org/3/${thingTYPE}/${thingID}/${creditsType}?api_key=a94a0ac2bca639fa00cb5b5a58bf2952`
)

    if (response1.ok) {
      const castdata = await response1.json();
      castdata.cast.forEach((person) => {
        if (thingTYPE =="tv"){
          let roles=person.roles[0].character
          // for (let i = 1;i < person.roles.length;i++){
          //   roles += person.roles[i].character
          // }
          castCards(person.name, person.profile_path,roles,person.id)
                
        }
        else{
          castCards(person.name, person.profile_path, person.character,person.id)
        }
      })
            const creatorsTXT = castdata.crew
      creatorsTXT.forEach(creator=>{
        if(creator.job=="Director"||creator.job=="Writer"){
generateCreators(creator.name,creator.job,creator.id)
        }
          });
    }
  } 
  catch (error) {
    console.log(error);
  }
}
async function getVideo() {
  try {
    const response1 = await fetch(
      `https://api.themoviedb.org/3/${thingTYPE}/${thingID}/videos?api_key=${api_key}`
    );
      console.log(`https://api.themoviedb.org/3/${thingTYPE}/${thingID}/videos?api_key=${api_key}`)
    if (response1.ok) {
      const data = await response1.json();
      const trailer = data.results?.find((v) => v.type === "Trailer" && v.site === "YouTube")
        || data.results?.find((v) => v.site === "YouTube");
      trailerKey = trailer?.key ?? null;
      if (trailerKey) console.log(`found trailer key: ${trailerKey}`);
    }
  } catch (error) {
    console.log(error);
  }
}



function castCards(name, image, chara,id) {
  if(image==null){
    // console.log("ostafandy-ification");
      caraCAST.innerHTML = caraCAST.innerHTML + `        
            <div class="card1" id='${id}' onclick="window.location.href='./details/index.html?id=${id}'">
            <div class="card1img" style="background-image: url('../ostafandy.jpg')"></div>
            <a href="">${name}</a>
            <p>${chara}</p>
    </div>`;
  }
  else{
  caraCAST.innerHTML = caraCAST.innerHTML + `        
            <div class="card1" id='${id}' onclick="window.location.href='./details/index.html?id=${id}'">
            <div class="card1img" style="background-image: url('https://image.tmdb.org/t/p/w600_and_h900_face/${image}')"></div>
            <a href="">${name}</a>
            <p>${chara}</p>
    </div>`;
  }

}

function generateCreators(name , role , id){
  creators.innerHTML+=`
              <div class="creator">
                <a href='' style='color:#ffffff'id='${id}'>${name}</a>
                <p>${role}</p>
            </div>
  `
}

async function loadEpisodesSection(showData) {
  if(!episodesSection || !showData.seasons.length){
    episodesSection.classList.add("hidden");
    return;
  }

  episodesSection.classList.remove("hidden");
  seasonsList.innerHTML = '<p class="episodes-loading">Loading episodes…</p>';

  try {
    const seasons = showData.seasons.filter((season) => season.season_number > 0);
    const seasonDetails = await Promise.all(
      seasons.map(async (season) => {
        const response1 = await fetch(
          `${baseURL}/tv/${thingID}/season/${season.season_number}?api_key=${api_key}`
        );
        if(response1.ok){
          return response1.json();
        }
      })
    );

    seasonDetailsData = seasonDetails;
    seasonDisplayCounts = seasonDetails.map(() => 10);
    seasonsList.innerHTML = "";

    seasonDetails.forEach((seasonData, index) => {
      const seasonMeta = seasons[index];
      const episodeCount = seasonData.episodes.length;
      let ep = "";
      const visible = seasonData.episodes.slice(0, 10);

      visible.forEach((episode) => {
        ep = ep + `
          <div class="episode-item">
            <div class="episode-item__top">
              <span class="episode-number">EP ${episode.episode_number}</span>
              <span class="episode-rating">${episode.vote_average ? '⭐ ' + episode.vote_average.toFixed(1) : '⭐ NR'}</span>
            </div>
            <h4>${episode.name}</h4>
            <p>${episode.overview}</p>
          </div>
        `;
      });

      seasonsList.innerHTML = seasonsList.innerHTML + `
        <details class="season-card" data-season-index="${index}">
          <summary class="season-card__header">
            <div>
              <h3>${seasonMeta.name}</h3>
              <p>${seasonMeta.air_date}</p>
            </div>
            <span class="season-count">${episodeCount} Episodes</span>
          </summary>
          <p class="season-summary">${seasonData.overview}</p>
          <div class="episodes-list">${ep}</div>
          <div class="season-actions">${seasonDisplayCounts[index] >= episodeCount ? "" : `<button type="button" class="show-more-btn" data-season-index="${index}">Show more</button>`}</div>
        </details>
      `;
    });

    seasonsList.querySelectorAll(".show-more-btn").forEach((button) => {
      button.onclick = (event) => {
        event.preventDefault();
        const index = Number(button.dataset.seasonIndex);
        const seasonData = seasonDetailsData[index];
        const episodeCount = seasonData.episodes.length;
        const currentCount = seasonDisplayCounts[index] || 10;
        const nextCount = Math.min(currentCount + 10, episodeCount);
        seasonDisplayCounts[index] = nextCount;
        const card = seasonsList.querySelector(`.season-card[data-season-index="${index}"]`);
        const listContainer = card.querySelector(".episodes-list");
        const actionsContainer = card.querySelector(".season-actions");
        let ep2 = "";
        seasonData.episodes.slice(0, nextCount).forEach((episode) => {
          ep2 = ep2 + `
            <div class="episode-item">
              <div class="episode-item__top">
                <span class="episode-number">EP ${episode.episode_number}</span>
                <span class="episode-rating">${episode.vote_average ? '⭐ ' + episode.vote_average.toFixed(1) : '⭐ NR'}</span>
              </div>
              <h4>${episode.name}</h4>
              <p>${episode.overview}</p>
            </div>
          `;
        });
        listContainer.innerHTML = ep2;
        actionsContainer.innerHTML = nextCount >= episodeCount ? "" : `<button type="button" class="show-more-btn" data-season-index="${index}">Show more</button>`;
        actionsContainer.querySelector(".show-more-btn").onclick = (event) => {
          event.preventDefault();
          const index2 = Number(event.currentTarget.dataset.seasonIndex);
          const seasonData2 = seasonDetailsData[index2];
          const episodeCount2 = seasonData2.episodes.length;
          const currentCount2 = seasonDisplayCounts[index2] || 10;
          const nextCount2 = Math.min(currentCount2 + 10, episodeCount2);
          seasonDisplayCounts[index2] = nextCount2;
          const card2 = seasonsList.querySelector(`.season-card[data-season-index="${index2}"]`);
          const listContainer2 = card2.querySelector(".episodes-list");
          const actionsContainer2 = card2.querySelector(".season-actions");
          let ep3 = "";
          seasonData2.episodes.slice(0, nextCount2).forEach((episode) => {
            ep3 = ep3 + `
              <div class="episode-item">
                <div class="episode-item__top">
                  <span class="episode-number">EP ${episode.episode_number}</span>
                  <span class="episode-rating">${episode.vote_average ? '⭐ ' + episode.vote_average.toFixed(1) : '⭐ NR'}</span>
                </div>
                <h4>${episode.name}</h4>
                <p>${episode.overview}</p>
              </div>
            `;
          });
          listContainer2.innerHTML = ep3;
          actionsContainer2.innerHTML = nextCount2 >= episodeCount2 ? "" : `<button type="button" class="show-more-btn" data-season-index="${index2}">Show more</button>`;
          actionsContainer2.querySelector(".show-more-btn").onclick = (event) => {
            event.preventDefault();
            const index3 = Number(event.currentTarget.dataset.seasonIndex);
            const seasonData3 = seasonDetailsData[index3];
            const episodeCount3 = seasonData3.episodes.length;
            const currentCount3 = seasonDisplayCounts[index3] || 10;
            const nextCount3 = Math.min(currentCount3 + 10, episodeCount3);
            seasonDisplayCounts[index3] = nextCount3;
            const card3 = seasonsList.querySelector(`.season-card[data-season-index="${index3}"]`);
            const listContainer3 = card3.querySelector(".episodes-list");
            const actionsContainer3 = card3.querySelector(".season-actions");
            let ep4 = "";
            seasonData3.episodes.slice(0, nextCount3).forEach((episode) => {
              ep4 = ep4 + `
                <div class="episode-item">
                  <div class="episode-item__top">
                    <span class="episode-number">EP ${episode.episode_number}</span>
                    <span class="episode-rating">${episode.vote_average ? '⭐ ' + episode.vote_average.toFixed(1) : '⭐ NR'}</span>
                  </div>
                  <h4>${episode.name}</h4>
                  <p>${episode.overview}</p>
                </div>
              `;
            });
            listContainer3.innerHTML = ep4;
            actionsContainer3.innerHTML = nextCount3 >= episodeCount3 ? "" : `<button type="button" class="show-more-btn" data-season-index="${index3}">Show more</button>`;
            actionsContainer3.querySelector(".show-more-btn").onclick = (event) => {
              event.preventDefault();
              const index4 = Number(event.currentTarget.dataset.seasonIndex);
              const seasonData4 = seasonDetailsData[index4];
              const episodeCount4 = seasonData4.episodes.length;
              const currentCount4 = seasonDisplayCounts[index4] || 10;
              const nextCount4 = Math.min(currentCount4 + 10, episodeCount4);
              seasonDisplayCounts[index4] = nextCount4;
              const card4 = seasonsList.querySelector(`.season-card[data-season-index="${index4}"]`);
              const listContainer4 = card4.querySelector(".episodes-list");
              const actionsContainer4 = card4.querySelector(".season-actions");
              let ep5 = "";
              seasonData4.episodes.slice(0, nextCount4).forEach((episode) => {
                ep5 = ep5 + `
                  <div class="episode-item">
                    <div class="episode-item__top">
                      <span class="episode-number">EP ${episode.episode_number}</span>
                      <span class="episode-rating">${episode.vote_average ? '⭐ ' + episode.vote_average.toFixed(1) : '⭐ NR'}</span>
                    </div>
                    <h4>${episode.name}</h4>
                    <p>${episode.overview}</p>
                  </div>
                `;
              });
              listContainer4.innerHTML = ep5;
              actionsContainer4.innerHTML = nextCount4 >= episodeCount4 ? "" : `<button type="button" class="show-more-btn" data-season-index="${index4}">Show more</button>`;
            };
          };
        };
      };
    });
  } catch (error) {
    console.log(error);
    seasonsList.innerHTML = '<p class="episodes-error">Episodes are not available right now.</p>';
  }
}

function generateScore(score){
  if(scoreP){
    scoreP.innerHTML = `${score}%`;
  }
}
getcast();
getVideo();