import View from './View.js';
// import ps from '../src/svg/platformLogo/playstation.svg';
import ps from '../../src/svg/platformLogo/playstation.svg';
import xbox from '../../src/svg/platformLogo/xbox.svg';
import pc from '../../src/svg/platformLogo/windows.svg';
import nintendo from '../../src/svg/platformLogo/nintendo.svg';
import apple from '../../src/svg/platformLogo/apple.svg';
import android from '../../src/svg/platformLogo/android.svg';
import linux from '../../src/svg/platformLogo/linux.svg';
import amiga from '../../src/svg/platformLogo/amiga.svg';
import atari from '../../src/svg/platformLogo/atari.svg';
import moar from '../../src/svg/platformLogo/more.svg';



class gameCardsPreview extends View {
  _parentElement = document.querySelector('.display');

addHandlerRender(handler) {
    window.addEventListener('load',handler);
  }

  _generateMarkup() {
    

    return  `
    <div class="game__container">
        <a href="#" class="game__container_game-link"></a>
        <img src=${this._data.background_image} alt="Game Image" class="game__container--game-image">
        <div class="game__container__overlay  aria-hidden="true"">
        <div class="game__container__overlay_heading-container">
            <h4 class="game__container__overlay_game-title">${this._data.name}</h4>
            <hr>
        </div> 
        
            <div class="game__container__overlay-info-container">
                    <span class="game__overlay-info-container-headings">Genre:</span>
                    <span class="game__overlay-info-container-headings-info-genre">${this._data.genres.map(genName =>{
                        return genName.name
                    })}</span>
                    <br>
                    <span class="game__overlay-info-container-headings">Tags:</span>
                    <span class="game__overlay-info-container-headings-info-tags">${this._data.tags.map(nam => nam.name).slice(0,2).join('/')}</span>
                    <br>
                    <span class="game__overlay-info-container-headings">Released On:</span>
                    <span class="game__overlay-info-container-headings-info-released">${this._data.released}</span>

                    <div class="game__votingbar-container">

                    <div class="game__votingbar-container-bar">
                        <div class="game__votingbar-container-bar-rate-container">
                            <span class="rate" id='exceptional'>${this._data.ratings[0].percent}%</span> 
                        </div>
                        <div class="game__votingbar-container-bar-color" id="bar_exceptional" style='width:${this._data.ratings[0].percent}%;'
                         >
                        <span class="game__votingbar-container-bar-text-exceptional">EXCEPTIONAL</span>
                        </div>                       
                    </div>

                    <div class="game__votingbar-container-bar">
                            <div class="game__votingbar-container-bar-rate-container">
                            <span class="rate" id='recommended'>${this._data.ratings[1].percent}%</span> 
                        </div>
                        <div class="game__votingbar-container-bar-color" id="recommended" style='width:${this._data.ratings[1].percent}%;' >
                                <span class="game__votingbar-container-bar-text-recommended">RECOMMENDED</span>
                        </div>
                    
                    </div>

                    <div class="game__votingbar-container-bar">
                            <div class="game__votingbar-container-bar-rate-container">
                            <span class="rate" id='not-bad'>${this._data.ratings[2].percent}%</span> 
                        </div>
                        <div class="game__votingbar-container-bar-color" id="not-bad" style='width:${this._data.ratings[2].percent}%;' >
                            <span class="game__votingbar-container-bar-text-not-bad">NOT BAD</span>
                        </div>
                        
                    </div>

                    <div class="game__votingbar-container-bar">
                            <div class="game__votingbar-container-bar-rate-container">
                            <span class="rate" >${this._data.ratings[3].percent}%</span> 
                        </div>
                        <div class="game__votingbar-container-bar-color" id="dont-bother" style='width:${this._data.ratings[3].percent}%;' >
                            <span class="game__votingbar-container-bar-text-dont-bother">DON'T BOTHER</span>
                        </div>
                        
                    </div>
            </div>
        </div>    
             
        <ul class="platforms_icon-container">
            <li class="platforms_icon-container-ball">
            <img src="${this._data.slugs.includes('playstation')? ps:this.renderMore()}" alt="Platforms_logo" id='imgId_ps' class='ps'>
            </li>
            <li class="platforms_icon-container-ball">
            <img src="${this._data.slugs.includes('xbox')? xbox:this.renderMore()}" alt="Platforms_logo">
            </li>
            <li class="platforms_icon-container-ball">
            <img src="${this._data.slugs.includes('pc')? pc:this.renderMore()}" alt="Platforms_logo">
            </li>
          </ul> 
        </div>
   </div>
`
  }

  renderMore(){
    return moar;
  }
}

export default new gameCardsPreview();
