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
const scoreP = document.querySelector("#score P");
const phrase = document.querySelector("#phrase");
const overView = document.querySelector("#overView");
const genras = document.querySelector("#genras");
const playBtn = document.getElementById("playbtn");
const trailerModal = document.getElementById("trailerModal");
const closeTrailerModal = document.getElementById("closeTrailerModal");
const trailerFrame = document.getElementById("trailerFrame");
let creditsType = 0;
let trailerKey = null;

if(thingTYPE=='tv'){
  creditsType = 'aggregate_credits';
  getinfoS();
}
else{
  creditsType = 'credits'
  getinfoM();
}

function openTrailerModal() {
  if (!trailerKey) {
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

playBtn?.addEventListener("click", openTrailerModal);
playBtn?.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openTrailerModal();
  }
});
closeTrailerModal?.addEventListener("click", closeTrailerModalHandler);
trailerModal?.addEventListener("click", (event) => {
  if (event.target === trailerModal) {
    closeTrailerModalHandler();
  }
});

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
  if (image==null){
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

function generateScore(score){
  scoreP.innerHTML= score + "%";
}
getcast();
getVideo();