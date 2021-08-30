/**
 * 
-${url}games?key=${KEY}&search='Anno'` :model of search parameter
-games
-games/{id} : gives out the details including metacritc
/games/{id}/movies
-genres : list
- genre/{id} :details of the genre
- tags : list
- tags/{id}
- stores :lists of stores
- stores/{id} :details
-developers : list of devs
-developers/{id}  : details of the dev
-creators :lists of creators
- creators/{id} :details
-publishers :list
-publishers/{id}

 */

/**
 * Youtube help : https://www.youtube.com/watch?v=7BiHIRHwNPo&ab_channel=MattMiller
 */

///////////////////////////////////////////////////////

import 'regenerator-runtime/runtime'




const KEY = 'f38648acb2984a71a947721775c317e6';
const url = `https://api.rawg.io/api/`

const gameContainer = document.querySelector('.display');
let ratingBarExceptional = document.getElementById('exceptional');
let ratingBarRecommended = document.getElementById('recommended');
let ratingBarNotBad = document.getElementById('not-bad');
let ratingBarDntBother = document.getElementById('dont-bother');
let barContainerColor = document.querySelector('.game__votingbar-container-bar-color');


// console.log(barContainerColor);



const showGame = async function(){ 
    try{
        const response = await fetch(`${url}games?key=${KEY}`);
        const data = await response.json();
        if(!response.ok) throw new Error(`${data.message}`)
        console.log(response,data);

const results = data.results;

// console.log(results.map(rate =>{
//    return rate.ratings.map(perc =>{
//        return perc.percent;
//    });
// }));

// console.log(results.map(rate =>{
//    return rate.ratings.map((perc )=>{
//        let arrPerc = perc.percent;
//        let arrTitle = perc.title;
//        return arrPerc
       
//    });
// }));


const gameRateBarColor = results.map(rate =>{
    let rateExceptional= rate.ratings[0].percent;
    return rateExceptional;
})
console.log(gameRateBarColor);
// ratingBarExceptional.style.width = gameRateBarColor;
// barContainerColor.style.width = `${gameRateBarColor}%`;

// ratingBarExceptional.setAttribute('style',`width:${gameRateBarColor}%`)

const markUp = results.map(game =>{
    // console.log(genresHigh);
    return  `
    <div class="game__container">
        <a href="#" class="game__container_game-link"></a>
        <img src=${game.background_image} alt="Game Image" class="game__container--game-image">
        <div class="game__container__overlay  aria-hidden="true"">
        <div class="game__container__overlay_heading-container">
            <h4 class="game__container__overlay_game-title">${game.name}</h4>
            <hr>
        </div> 
        
            <div class="game__container__overlay-info-container">
                    <span class="game__overlay-info-container-headings">Genre:</span>
                    <span class="game__overlay-info-container-headings-info-genre">${game.genres.map(genName =>{
                        return genName.name
                    })}</span>
                    <br>
                    <span class="game__overlay-info-container-headings">Tags:</span>
                    <span class="game__overlay-info-container-headings-info-tags">${game.tags.map(nam => nam.name).slice(0,2).join('/')}</span>
                    <br>
                    <span class="game__overlay-info-container-headings">Released On:</span>
                    <span class="game__overlay-info-container-headings-info-released">${game.released}</span>

                    <div class="game__votingbar-container">

                    <div class="game__votingbar-container-bar">
                        <div class="game__votingbar-container-bar-rate-container">
                            <span class="rate" id='exceptional'>${game.ratings[0].percent}%</span> 
                        </div>
                        <div class="game__votingbar-container-bar-color" id="exceptional" >
                        <span class="game__votingbar-container-bar-text-exceptional">EXCEPTIONAL</span>
                        </div>                       
                    </div>

                    <div class="game__votingbar-container-bar">
                            <div class="game__votingbar-container-bar-rate-container">
                            <span class="rate" id='recommended'>${game.ratings[1].percent}%</span> 
                        </div>
                        <div class="game__votingbar-container-bar-color" id="recommended">
                                <span class="game__votingbar-container-bar-text-recommended">RECOMMENDED</span>
                        </div>
                    
                    </div>

                    <div class="game__votingbar-container-bar">
                            <div class="game__votingbar-container-bar-rate-container">
                            <span class="rate" id='not-bad'>${game.ratings[2].percent}%</span> 
                        </div>
                        <div class="game__votingbar-container-bar-color" id="not-bad">
                            <span class="game__votingbar-container-bar-text-not-bad">NOT BAD</span>
                        </div>
                        
                    </div>

                    <div class="game__votingbar-container-bar">
                            <div class="game__votingbar-container-bar-rate-container">
                            <span class="rate" id='dont-bother'>${game.ratings[3].percent}%</span> 
                        </div>
                        <div class="game__votingbar-container-bar-color" id="dont-bother">
                            <span class="game__votingbar-container-bar-text-dont-bother">DON'T BOTHER</span>
                        </div>
                        
                    </div>
            </div>
        </div>    
        
      
            <div class="game__container__overlay-platforms-icon-container">
                <div class="game__container__overlay-platforms-icon-container-platforms"> <img src="src/svg/playstation.svg" alt="game platforms image" class="svg">
                </div>
                <div class="game__container__overlay-platforms-icon-container-platforms"> <img src="src/svg/xbox.svg" alt="game platforms image" class="svg">
                </div>
                <div class="game__container__overlay-platforms-icon-container-platforms"> <img src="src/svg/windows.svg" alt="game platforms image" class="svg">
                </div>
            </div>
        </div>
    </div>
`

}).join('')
  



      
gameContainer.insertAdjacentHTML('afterbegin',markUp);
    } catch(err){
console.log(err);
    }};

showGame();

