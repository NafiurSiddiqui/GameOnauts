
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
import { API_URL , KEY} from './config';

// const KEY = 'f38648acb2984a71a947721775c317e6';
// const url = `https://api.rawg.io/api/`

const gameContainer = document.querySelector('.display');
const spinnerContainer =document.getElementById('spinner');
const emptyCardContainer = document.getElementById('empty_container');
let cardContainer = document.getElementsByClassName('game__container_game-link');
let gameCardContainer = document.querySelector('.game__container');
console.log( cardContainer);



function renderMore(){
 return moar;
}

 function clear() {
    gameContainer.innerHTML = '';
  }


  function renderSpinner() {
      spinnerContainer.removeAttribute('hidden');
  }

  function removeSpinner(){
    spinnerContainer.setAttribute('hidden','');
  };

  removeSpinner();
  function removeEmptyDiv(){
    emptyCardContainer.setAttribute('hidden','');
  };

let gameId = [];


const showGame = async function(){ 
    try{
     ;
      //1.render spinner
      renderSpinner()

      //2.add gameCards class to the container
      gameContainer.classList.add('gameCards');

      //3.Ajax call
        const response = await fetch(`${API_URL}games?key=${KEY}`);
        const data = await response.json();
        //4.clear spinner
        //  removeSpinner();
        clear();
         //5.clear empty card div
        //  removeEmptyDiv();
        if(!response.ok) throw new Error(`${data.message}`)
        console.log(response,data);

        const results = data.results;

        const markUp = results.map((game) =>{
        let id = game.id;
        // console.log(id);
        gameId.push(id);
        let barExceptional = Math.trunc(game.ratings[0].percent);
        let barRecommended = Math.trunc(game.ratings[1].percent);
        let barNotBad = Math.trunc(game.ratings[2].percent);
        let barDontBother = Math.trunc(game.ratings[3].percent);

        let platformSlug = game.parent_platforms.map(el=>{
            let platformName= el.platform.slug;
            return platformName;
        });

    return ` 
    <div class="game__container" data-id="${id}">
          <a href="javascript:;" class="game__container_game-link" ></a> 
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
                            <span class="rate" id='exceptional'>${barExceptional}%</span> 
                        </div>
                        <div class="game__votingbar-container-bar-color" id="bar_exceptional" style='width:${barExceptional}%;'
                         >
                        <span class="game__votingbar-container-bar-text-exceptional">EXCEPTIONAL</span>
                        </div>                       
                    </div>

                    <div class="game__votingbar-container-bar">
                            <div class="game__votingbar-container-bar-rate-container">
                            <span class="rate" id='recommended'>${barRecommended}%</span> 
                        </div>
                        <div class="game__votingbar-container-bar-color" id="recommended" style='width:${barRecommended}%;' >
                                <span class="game__votingbar-container-bar-text-recommended">RECOMMENDED</span>
                        </div>
                    
                    </div>

                    <div class="game__votingbar-container-bar">
                            <div class="game__votingbar-container-bar-rate-container">
                            <span class="rate" id='not-bad'>${barNotBad}%</span> 
                        </div>
                        <div class="game__votingbar-container-bar-color" id="not-bad" style='width:${barNotBad}%;' >
                            <span class="game__votingbar-container-bar-text-not-bad">NOT BAD</span>
                        </div>
                        
                    </div>

                    <div class="game__votingbar-container-bar">
                            <div class="game__votingbar-container-bar-rate-container">
                            <span class="rate" >${barDontBother}%</span> 
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
    `;

// const range = document.createRange();
// let frag = range.createContextualFragment(text);
// gameContainer.appendChild(frag);
//  const selectNode = document.querySelectorAll('.game__container_game-link');


}).join('')

gameContainer.insertAdjacentHTML('afterbegin',markUp);

// for (let i = 0; i < cardContainer.length; i++) {
//   cardContainer[i].addEventListener('click',(e)=>{
//     console.log('ok!',e.target.parentNode.dataset.id);
//   })}
for (let i = 0; i < cardContainer.length; i++) {
  cardContainer[i].addEventListener('click',(e)=>{
    console.log('ok!',e.target.parentNode.dataset.id);

    let dataID =e.target.parentNode.dataset.id;
    fetchGameID(dataID);

  })}
    } catch(err){
console.log(err);
    }};

// showGame();


const fetchGameID = async function(id){ 
    try{
      //2.render spinner
      renderSpinner()
      //3.remove gameCards class to the gameContainer
      gameContainer.classList.remove('gameCards');
      //4.add gameId class to the gameContainer
      gameContainer.classList.add('gameId');
      //4.AJAX call
      
        const response = await fetch(`${API_URL}games/${id}?key=${KEY}`);
        const data = await response.json();
        if(!response.ok) throw new Error(`${data.message}`)
        console.log(data);
        console.log(data.stores.map(store=> store.store.name).length);
        console.log(data.stores.map(store=> store.store.name));
        // console.log(data.stores.map(domain=> domain.store.domain));
  
    // data.tags.forEach(element => {
    //         console.log(element.name)
    //     });
        let parentPlatform = data.parent_platforms.map(platform=>platform.platform.slug);
        console.log(parentPlatform);
        let storeName = data.stores.map(store=> store.store.name);
        let storeDomain = data.stores.map(domain=> domain.store.domain);
        // console.log(storeName);
        // console.log(storeDomain[0]);
        const markup = `
            <header id="gamePage_header">
          <div id="image-container">
            <p id="image-container-playtime">
              Average playtime:
              <span id="image-container-playtime-digit">${data.playtime} hours</span>
            </p>
            <img
              src="${data.background_image}"
              alt=""
              id="image-container-gameImage"
            />

          </div>
          <div id="gamePage_header-gameTitle-container">
            <h1 id="gamePage_header-gameTitle-container-text">${data.name}</h1>
          </div>
        </header>

        <section id="info-wrapper">

        <section class="platform-container">
  <ul class="platform-container-balls-container">
    <li class="platform-container-balls-container-ball">
      <img src="${parentPlatform.includes('pc')? pc:renderMore()}" alt="Platform">
    </li>
    <li class="platform-container-balls-container-ball">
      <img src="${parentPlatform.includes('playstation')? ps:renderMore()}" alt="Platform">
    </li>
    <li class="platform-container-balls-container-ball">
      <img src="${parentPlatform.includes('xbox')? xbox:renderMore()} " alt="Platform">
    </li>
  </ul>
</section>

          <article id="secondrow">
            <section id="secondrow-description-box">
              <h2 id="secondrow-description">Description</h2>
              <hr id="secondrow-description-box-hr" />
              <br />
              
               ${data.description}
              
            </section>

            <aside id="secondrow-gameInfo">
              <div id="secondrow-metascore-container">
                <h4 id="secondrow-metascore-container-heading">Metascore</h4>
                <span id="secondrow-metascore-container-Box">${data.metacritic}</span>
              </div>
              <br />
              <section id="secondrow-parentContainer">
                <article class="secondrow-childContainer">
                  <h4>Developer-</h4>
                  <hr />
                  <p class="secondrow-childContainer-infoBox">${data.developers[0].name}</p>
                </article>

                <article class="secondrow-childContainer">
                  <h4>Publisher-</h4>
                  <hr />
                  <p class="secondrow-childContainer-infoBox">${data.publishers[0].name}</p>
                </article>

                <article class="secondrow-childContainer">
                  <h4>Released-</h4>
                  <hr />
                  <p class="secondrow-childContainer-infoBox">${data.released}</p>
                </article>

                <article class="secondrow-childContainer">
                  <h4>Genre-</h4>
                  <hr />
                  <p class="secondrow-childContainer-infoBox">${data.genres.map(name=>name.name).slice(0,2)}</p>
                </article>

                <article class="secondrow-childContainer">
                  <h4>Reddit Name/Link-</h4>
                  <hr />
                  <p class="secondrow-childContainer-infoBox">${data.reddit_name}</p>
                </article>
              </section>
            </aside>
          </article>
          <br />

          <section id="thirdrow-container">
            <section id="thirdrow-container-background">
              <div class="thirdrow-container-stat-box">
                <div class="thirdrow-container-stat-gradiant">
                  <div class="thirdrow-container-stat-background">
                    <p class="thirdrow-container-stat-box-digit">${data.added_by_status.beaten}</p>
                  </div>
                </div>
                <p class="thirdrow-container-stat-box-beaten">Beaten</p>
              </div>
              <div class="thirdrow-container-stat-box">
                <div class="thirdrow-container-stat-gradiant">
                  <div class="thirdrow-container-stat-background">
                    <span class="thirdrow-container-stat-box-digit">${data.added_by_status.dropped}</span>
                  </div>
                </div>
                <p class="thirdrow-container-stat-box-dropped">Dropped</p>
              </div>

              <div class="thirdrow-container-stat-box">
                <div class="thirdrow-container-stat-gradiant">
                  <div class="thirdrow-container-stat-background">
                    <span class="thirdrow-container-stat-box-digit">${data.added_by_status.owned}</span>
                  </div>
                </div>
                <p class="thirdrow-container-stat-box-owned">Owned</p>
              </div>

              <div class="thirdrow-container-stat-box">
                <div class="thirdrow-container-stat-gradiant">
                  <div class="thirdrow-container-stat-background">
                    <span class="thirdrow-container-stat-box-digit">${data.added_by_status.playing}</span>
                  </div>
                </div>
                <p class="thirdrow-container-stat-box-playing">Playing</p>
              </div>
            </section>
          </section>

          <section class="fourthrow-container">
            <div class="fourthrow-container-header">
              <h2>Available On</h2>
              <hr />
            </div>
           
            <article class=fourthrow-container-store-container'>
              <div class="fourthrow-container-image-container">
                    <div class="fourthrow-container-image-container-content">
                    <a href="https://${storeDomain[0]}">${storeName? storeName[0]:''}</a>
                        
                    </div>
                </div>
            </article>
            <article class=fourthrow-container-store-container'>
              <div class="fourthrow-container-image-container">
                    <div class="fourthrow-container-image-container-content">
                       <a href="https://${storeDomain[1]}">${storeName? storeName[1]:''}</a>
                    </div>
                </div>
            </article>
            <article class=fourthrow-container-store-container'>
              <div class="fourthrow-container-image-container">
                    <div class="fourthrow-container-image-container-content">
                        <a href="https://${storeDomain[2]}">${storeName? storeName[2]:''}</a>
                    </div>
                </div>
            </article>
            <article class=fourthrow-container-store-container'>
              <div class="fourthrow-container-image-container">
                    <div class="fourthrow-container-image-container-content">
                       <a href="https://${storeDomain[3]}">${storeName? storeName[3]:''}</a>
                    </div>
                </div>
            </article>
          </section>

          <section class="fifth-container">
            <span class="fifth-container-tag">${data.tags.map(name=>name.name).slice(0,1)} </span>

            <span class="fifth-container-tag"> ${data.tags.map(name=>name.name).slice(1,2)} </span>
            <span class="fifth-container-tag"> ${data.tags.map(name=>name.name).slice(2,3)}</span>
            <span class="fifth-container-tag"> ${data.tags.map(name=>name.name).slice(3,4)}</span>
          </section>
        </section>
        `
      clear();
        gameContainer.insertAdjacentHTML('afterbegin',markup);

    
    } catch(err){
console.log(err);
    }};







