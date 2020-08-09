import * as Actiontypes from './ActionTypes';

export const Leaders = (state = {isLoading: false, errMess: null, leaders: []}, action) => {
    switch(action.type){//We'll use switch for diffrent type of switch actions, and default will return the previous state
        case Actiontypes.LEADERS_LOADING:
            return{...state, isLoading: true, errMess: null, leaders: []}
        case Actiontypes.ADD_LEADERS:
            return{...state, isLoading: false, errMess: null, leaders: action.payload}
        case Actiontypes.LEADERS_FAILED:
            return{...state, isLoading: false, errMess: action.payload, leaders: []}
        default: return state;
    }
}



//Now, we have seperate reducer functions for all the state components 
//Exporting the reducer function, which will receive the current state and action
//Reducer function job is to do immutable change to state and return the updated version
//Initially in store the state is undefined, so default value of the state is initialState