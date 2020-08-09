//Here we'll configure the store and export it 
//createStore is already a redux component which allows us to create a store
//combineReducers is a method provided by redux. used to combine all the seperate reducer functions 
 import { createStore, combineReducers, applyMiddleware } from 'redux'; 
 import { createForms } from 'react-redux-form'; //createForms makes a reducer for the state of the forms
 import { Dishes } from './dishes';//Importng all the seperate reducer functions
 import { Comments } from './comments';
 import { Promotions } from './promotions';
 import { Leaders } from './leaders';
 import thunk from 'redux-thunk';
 import logger from 'redux-logger';
 import { InitialFeedback } from './forms';
 
 export const ConfigureStore = () => {
    const store = createStore( // createStore requires two parameters, ie reducer and enhancer
         combineReducers({     // In this function, we'll have to map all the objects to the values imported from the reducer functions
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            ...createForms({     //This is how we make a reducer function to carry the state of form
               feedback: InitialFeedback 
            })
         }),
         applyMiddleware(thunk, logger)//This is the enhancer part in createStore
    );

    return store;
 }
//Purpose of this function is just to create a redux store and configure it 
 

