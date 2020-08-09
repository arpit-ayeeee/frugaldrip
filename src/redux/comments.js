//Here we'll make a seperate reducer function for comments 
import * as ActionTypes from './ActionTypes';

export const Comments = (state = {errMess: null, comments: []}, action) => {
    switch(action.type){//We'll use switch for diffrent type of switch actions, and default will return the previous state
        case ActionTypes.COMMENTS_FAILED:
            return{...state, errMess: action.payload, comments:[]}
        case ActionTypes.ADD_COMMENTS:
            return{...state, errMess: null, comments: action.payload}
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;             //This is how we apply the current date
            return {...state, comments: state.comments.concat(comment)}; //So, we'll return the new state with the added comments, as we concat
        default:
            return state;
    }
}


//Now, we have seperate reducer functions for all the state components 
//Exporting the reducer function, which will receive the current state and action
//Reducer function job is to do immutable change to state and return the updated version
//Initially in store the state is undefined, so default value of the state is initialState