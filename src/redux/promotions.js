//Here we'll make a seperate reducer function for promotions 
import * as ActionTypes from './ActionTypes';

export const Promotions = (state ={isLoading: false, errMess: null, promotions: []}, action) => {
    switch(action.type){        //We'll use switch for diffrent type of switch actions, and default will return the previous state
        case ActionTypes.PROMOS_LOADING:
            return{...state, isLoading: true, errMess: null, promotions:[]}
        case ActionTypes.PROMOS_FAILED:
            return{...state, isLoading: false, errMess: action.payload, promotions:[]}
        case ActionTypes.ADD_PROMOS:
            return{...state, isLoading: false, errMess: null, promotions:action.payload}
        default: return state;
    }
}



//Now, we have seperate reducer functions for all the state components 
//Exporting the reducer function, which will receive the current state and action
//Reducer function job is to do immutable change to state and return the updated version
//Initially in store the state is undefined, so default value of the state is initialState