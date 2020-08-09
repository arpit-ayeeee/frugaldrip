//Here we'll make a seperate reducer function for dishes.
import * as ActionTypes from'./ActionTypes';

export const Dishes = (state = {isLoading: false, errMess: null, dishes: []}, action) => { //Intially the loading will be true cause there is no data in dishes, and error message is null, later if it satisfies the test cases, an error will be shown
    switch(action.type){                 //We'll use switch for diffrent type of switch actions, and default will return the previous state
        case ActionTypes.ADD_DISHES:     //case to add the dishes
            return{...state, isLoading: false, errMess: null, dishes: action.payload} //here action.payload carries the info of dishes
        case ActionTypes.DISHES_LOADING: //case when the dishes are loading 
            return{...state, isLoading: true, errMess: null, dishes: []}      //says we'll take the current value of the state, and then applly these modifications to the state and return a new state 
        case ActionTypes.DISHES_FAILED:  //case when the dishes failed to load
            return{...state, isLoading: false, errMess: action.payload  , dishes: []}       //Here, action.payload carries the error message info
        default: return state;
    }
}

//Now, we have seperate reducer functions for all the state components 
//Exporting the reducer function, which will receive the current state and action
//Reducer function job is to do immutable change to state and return the updated version
//Initially in store the state is undefined, so default value of the state is initialState

//We use action.payload, here the action corresponds to that particular action which has the same actionType