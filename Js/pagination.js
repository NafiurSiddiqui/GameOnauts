import ps from '../src/svg/platformLogo/playstation.svg';
import xbox from '../src/svg/platformLogo/xbox.svg';
import pc from '../src/svg/platformLogo/windows.svg';
import nintendo from '../src/svg/platformLogo/nintendo.svg';
import apple from '../src/svg/platformLogo/apple.svg';
import android from '../src/svg/platformLogo/android.svg';
import linux from '../src/svg/platformLogo/linux.svg';
import amiga from '../src/svg/platformLogo/amiga.svg';
import atari from '../src/svg/platformLogo/atari.svg';
import moar from '../src/svg/platformLogo/more.svg';
import 'regenerator-runtime/runtime';
import './helper';
import { AJAX } from './helper';
import { API_URL,TIMEOUT_SEC,KEY } from './config';

const gameContainer = document.querySelector('.display');
const pagContainer = document.querySelector('.pagination');





const state = {
  game: {},
  pagination:{},
  search: {
    query: '',
    results: [],
    page: '',
  },
  wishlist: [],
};

const createGameObjectCards = function (data) {

  return {
    results:data.results,
    filters:data.filters.years,
    nextPage:data.next,
    previousPage:data.previous,
    seoTitle:data.seo_title,
    genres:data.results.map(gen =>  gen.genres),
    tags:data.results.map(tag => tag.tags),
    ratings:data.results.map(rate =>rate.ratings),
    slugs:data.results.map(pp =>pp.parent_platforms)
  };
  
};

const createGameObjectCards2 = function (data) {

  return {
    results:data.results,
    filters:data.filters.years,
    nextPage:data.next,
    previousPage:data.previous,
    seoTitle:data.seo_title,
    genres:data.results.map(gen =>  gen.genres),
    tags:data.results.map(tag => tag.tags),
    ratings:data.results.map(rate =>rate.ratings),
    slugs:data.results.map(pp =>pp.parent_platforms)
  };
  
};

function renderMore(){
 return moar;
}



//pagination



const AJAXpagination2 = async function () {
  try {
    const res = await fetch(`${API_URL}games?key=${KEY}`);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    state.game = createGameObjectCards(data); 
    console.log(state.game.nextPage.includes('page=2'));
  

    pagContainer.addEventListener('click',function(e){
    const pagNext = e.target.closest('.btn--inline ');
    console.log(pagNext);
    async function getData(url){
        const res = await fetch(url);
        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        console.log(state.game);
        //create a separate objects here and 
        state.pagination = createGameObjectCards2(data);
        console.log(state.pagination.results);
        const results = state.pagination.results;
        const markUp = results.map((game) =>{

        let barExceptional = game.ratings[0].percent;
        let barRecommended = game.ratings[1].percent;
        let barNotBad = game.ratings[2].percent;
        let barDontBother = game.ratings[3].percent;


let platformSlug = game.parent_platforms.map(el=>{
    let platformName= el.platform.slug;
    return platformName;
    
});

// console.log(platformSlug);

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
                        <div class="game__votingbar-container-bar-color" id="bar_exceptional" style='width:${barExceptional}%;'
                         >
                        <span class="game__votingbar-container-bar-text-exceptional">EXCEPTIONAL</span>
                        </div>                       
                    </div>

                    <div class="game__votingbar-container-bar">
                            <div class="game__votingbar-container-bar-rate-container">
                            <span class="rate" id='recommended'>${game.ratings[1].percent}%</span> 
                        </div>
                        <div class="game__votingbar-container-bar-color" id="recommended" style='width:${barRecommended}%;' >
                                <span class="game__votingbar-container-bar-text-recommended">RECOMMENDED</span>
                        </div>
                    
                    </div>

                    <div class="game__votingbar-container-bar">
                            <div class="game__votingbar-container-bar-rate-container">
                            <span class="rate" id='not-bad'>${game.ratings[2].percent}%</span> 
                        </div>
                        <div class="game__votingbar-container-bar-color" id="not-bad" style='width:${barNotBad}%;' >
                            <span class="game__votingbar-container-bar-text-not-bad">NOT BAD</span>
                        </div>
                        
                    </div>

                    <div class="game__votingbar-container-bar">
                            <div class="game__votingbar-container-bar-rate-container">
                            <span class="rate" >${game.ratings[3].percent}%</span> 
                        </div>
                        <div class="game__votingbar-container-bar-color" id="dont-bother" style='width:${barDontBother}%;' >
                            <span class="game__votingbar-container-bar-text-dont-bother">DON'T BOTHER</span>
                        </div>
                        
                    </div>
            </div>
        </div>    
             
        <ul class="platforms_icon-container">
            <li class="platforms_icon-container-ball">
            <img src="${platformSlug.includes('playstation')? ps:renderMore()}" alt="Platforms_logo" id='imgId_ps' class='ps'>
            </li>
            <li class="platforms_icon-container-ball">
            <img src="${platformSlug.includes('xbox')? xbox:renderMore()}" alt="Platforms_logo">
            </li>
            <li class="platforms_icon-container-ball">
            <img src="${platformSlug.includes('pc')? pc:renderMore()}" alt="Platforms_logo">
            </li>
          </ul> 
        </div>
   </div>
`


}).join('')

gameContainer.insertAdjacentHTML('afterbegin',markUp);
    };
    
    getData(state.game.nextPage);

})
    
  } catch (err) {
    throw err;
  }
};

AJAXpagination2();

class pagination {
  parentElement = document.querySelector('.display');
  childElement = document.querySelector('.pagination');
  
  //load games
  AJAXpagination2;
  
  render(){
    console.log(this.data);
  }
  //render games


}
