import * as model from './model';
import 'core-js/stable';
import 'regenerator-runtime';
import gameCardsLoopView from './views/gameCardsLoopView';
import gameCardsPreview from './views/gameCardsPreview';



const controlGame = async function () {
  try {
    

    gameCardsPreview.renderSpinner();


    // 2) Loading recipe
    await model.loadGames();

    // 3) Rendering recipe
    gameCardsPreview.render(model.state.game);
  } catch (err) {
    gameCardsPreview.renderError();
    console.error(err);
  }
};

const controlGameCards = async function(){ 
  try{
        gameCardsPreview.renderSpinner();
        //1.load game cards
        await model.loadGames();

        //2.render game cards
        
  }catch(err){

 }
};

const init = function () {

 gameCardsPreview.addHandlerRender(controlGameCards);
//  gameCardsPreview.addHandlerRender(controlGame);

};
init();
