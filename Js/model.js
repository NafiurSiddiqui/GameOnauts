import { API_URL,  KEY } from './config.js';
import 'regenerator-runtime';
import { AJAX } from './helper.js';

export const state = {
  game: {},
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
    filters:data.filters,
    nextPage:data.next,
    previousPage:data.previous,
    seoTitle:data.seo_title,
    genres:data.results.map(gen =>  gen.genres),
    tags:data.results.map(tag => tag.tags),
    ratings:data.results.map(rate =>rate.ratings),
    slugs:data.results.map(pp =>pp.parent_platforms)
  };
  
};


export const loadGames = async function () {
  try {
    const data = await AJAX(`${API_URL}games?key=${KEY}`);
    state.game = createGameObjectCards(data);

    // if (state.wishlist.some(bookmarked => bookmarked.id === id))
    //   state.game.bookmarked = true;
    // else state.game.bookmarked = false;

    console.log(state.game);
  } catch (err) {
    // Temp error handling
    console.error(`${err} 💥💥💥💥`);
    throw err;
  }
};

export const loadGameCards = async function(){
   try{
        const data = AJAX(`${API_URL}games?key=${KEY}`);
      
        // state.game =createGameObjectCards(data);
       
       
        
   }catch(err){
       console.error(`${err} 💥💥💥💥`);
    throw err;
   }};


// export const loadPagination =function(){
//   AJAX
// };