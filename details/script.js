const baseURL = "https://api.themoviedb.org/3";
const api_key= 'a94a0ac2bca639fa00cb5b5a58bf2952';
const urlParams = new URLSearchParams(window.location.search);
const thingID = urlParams.get('id');
const thingTYPE = urlParams.get('media_type');
const caraCAST = document.getElementById("caraCAST");
let creditsType = 0

if(thingTYPE=='tv'){
  creditsType = 'aggregate_credits'
}
else{
  creditsType = 'credits'
}

// async function getinfo() {
//   try {
//     const response1 = await fetch(
//       `https://api.themoviedb.org/3/${thingTYPE}/${thingID}?api_key=${api_key}`,
//     );
//     if (response1.ok) {
//       const data = await response1.json();
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }


  async function  getcast()  {

  try {
    const response1 = await fetch(
      
      `https://api.themoviedb.org/3/${thingTYPE}/${thingID}/${creditsType}?api_key=a94a0ac2bca639fa00cb5b5a58bf2952`
    );
    console.log(`https://api.themoviedb.org/3/${thingTYPE}/${thingID}/${creditsType}?api_key=a94a0ac2bca639fa00cb5b5a58bf2952`)

    if (response1.ok) {
      const castdata = await response1.json();
      castdata.cast.forEach((person) => {
        if (thingTYPE =="tv"){
          let roles=person.roles[0].character
          for (let i = 1;i < person.roles.length;i++){
            roles += person.roles[i].character
          }
          console.log(roles)
          
          castCards(person.name, person.profile_path,roles,person.id)
        }
        else{
          castCards(person.name, person.profile_path, person.character,person.id)
        }
        
      });
    }
  } 
  catch (error) {
    console.log(error);
  }
}





function castCards(name, image, chara,id) {
  caraCAST.innerHTML = caraCAST.innerHTML + `        
            <div class="card1" id='${id}' onclick="window.location.href='./details/index.html?id=${id}'">
            <div class="card1img" style="background-image: url('https://image.tmdb.org/t/p/w600_and_h900_face/${image}')"></div>
            <a href="">${name}</a>
            <p>${chara}</p>
    </div>`;
}

// function generateCards(name, image, date,id) {
//   trendingM.innerHTML = trendingM.innerHTML + `        
//             <div class="card1" id='${id}' onclick="window.location.href='./details/index.html?id=${id}'">
//             <div class="card1img" style="background-image: url('https://image.tmdb.org/t/p/w600_and_h900_face/${image}')"></div>
//             <a href="">${name}</a>
//             <p>${date}</p>
//     </div>`;
// }

// getinfo();
getcast()
