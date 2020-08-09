import * as ActionTypes from './ActionTypes'; //Means, we'll import everything as actiontypes from the fileimport { DISHES } from '../shared/dishes';  //Now it's the responsibilty of action creater to provide the state of dishes to the reducer 
import { baseUrl } from '../shared/baseUrl';

////////////D I S H E S////////////
//We'll fetch the dishes here, as a thunk, so it'll return a function
//The thunk below first dispatch the dishesLoading and then dispatches the addDishes with DISHES we imported, after the delay of 2sec
export const fetchDishes = () => (dispatch) => {  //Here, fetchDishes is an object which is equal to a function, which will return another function, which takes dispatch as a parameter
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')            //Initially we declared the baseUrl, so now we'll take the data from json server    
         .then(response => {                    //When we recieve a response from server, and then there is error 
             if(response.ok){
                 return response;
             }
             else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
             }
         },
         error => {                             //Situation when the server doesnt even respond
             var errmess = new Error(error.message);
             throw errmess;
         }) //A promise 'then' takes two attributes, response and an errorhandler                  
        .then(response => response.json())      //Once we get the response, we'll convert it to json format
        .then(dishes => dispatch(addDishes(dishes)))    //Then we'll dispatch the response in json to addDishes method
        .catch(error => dispatch(dishesFailed(error.message)));         //.catch will catch all the errors   
}

//dishesLoading is equal to a function which gives another action object
export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING 
});

//dishesFailed is equal to a function which gives another action object
export const dishesFailed  = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess            //Will display an error message, will get retieved in the reducer
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes         //This data will get retieved in the reducer
});


////////////////C O M M E N T S/////////////////////
export const fetchComments = () => (dispatch) => { 

    return fetch(baseUrl + 'comments')           //We'll take the data from the json server 
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;

        })
        .then(response => response.json())      
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({     //UPLOADING ALL THE COMMENTS
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});
// ////////TRADITIONAL WAY//////////TO////ADD//////COMMENT///BY//USER
// //addComment is equal to function which takes four parameters, that creates an action object
// export const addComment = (dishId, rating, author, comment) => ({
//     type: ActionTypes.ADD_COMMENT, //Every action object contains a type, that is why we defined all the types in a single seperate doc, and import it
//     payload: {                     //payload contains whatever needs to be carried in the action object to the reducer
//           dishId: dishId,          //here, we'll map the parameters which the function recieves, to the four properties
//           rating: rating,
//           author: author,
//           comment: comment
//     }  
// });
////ADD//COMMENT//BY///USER///USING/////FETCH//////////
export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});
export const postComment = (dishId, rating, author, comment) => (dispatch) => {

    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    };
    newComment.date = new Date().toISOString();
    
    return fetch(baseUrl + 'comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
};

 

/////////////PROMOTIONS////////////////
export const fetchPromos = () => (dispatch) => { 
    dispatch(promosLoading(true));

    return fetch(baseUrl + 'promotions')           //We'll take the data from the json server 
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;

        })
        .then(response => response.json())      
        .then(promotions => dispatch(addPromos(promotions)))
        .catch(error => dispatch(promosFailed(error.message)));
}
export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promotions) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promotions
});


/////////////LEADERS//////////
export const fetchLeaders = () => (dispatch) => { 
    dispatch(leadersLoading(true));

    return fetch(baseUrl + 'leaders')           //We'll take the data from the json server 
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;

        })
        .then(response => response.json())      
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)));
}
export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});




export const postFeedback = (firstname,lastname,telnum,email,agree,contactType,message) => dispatch => {
    const newFeedback = {
      firstname: firstname,
      lastname: lastname,
      telnum: telnum,
      email: email,
      agree: agree,
      contactType: contactType,
      message: message
    };
  
    return fetch(baseUrl + "feedback", {
      method: "POST",
      body: JSON.stringify(newFeedback),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    })
      .then(
        response => {
          if (response.ok) {
            return response;
          }
           else {
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            error.response = response;
            throw error;
          }
        },
        error => {
            var errmess = new Error(error.message)
          throw errmess;
        }
      )
      .then(response => response.json())
      .then(response =>
        alert("Thank you for your feedback!" + JSON.stringify(response))
      )
      .catch(error => {
        console.log("post feedbacks", error.message);
        alert("Your feedback could not be posted\nError: " + error.message);
      });
  };
