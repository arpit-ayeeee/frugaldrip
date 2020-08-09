import React, { Component } from 'react'; 
import Home from './HomeComponent'; 
import Menu from './MenuComponent';//first we link
import Contact from './ContactComponent';
import About from './AboutComponent';
import DishDetail from './DishdetailComponent';
import Header from'./HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter} from 'react-router-dom'; 
import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback} from '../redux/ActionCreators'; 
import { actions } from 'react-redux-form'; //A predefined action provided by react-redux-form, which provides the reset action
import { TransitionGroup, CSSTransition} from 'react-transition-group'; 
//Initially the MainComponent had the state, but now it has to get connected to redux to get the state
//withRouter is required to connect the react component to redux  
//Main component gets it's state from the redux store
//Bootstrap javascript components come from reactstrap
//In reactstrap all the bootstrap components are tags themselves
//They dont need class to be defined
//In order to store the state we need to define it in a constructer
//We can make state available to menu compo using props
//Below function is used to map the redux store state into props which will be made available to all the components
    const mapStateToProps = state => {
        return{
            dishes : state.dishes,      //We'll get the state from redux store
            comments : state.comments,
            promotions : state.promotions,
            leaders : state.leaders
        }
    }
    const mapDispatchToProps = (dispatch) => ({  //This function recieves dispatch from the redux store
        postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
        fetchDishes: () => { dispatch(fetchDishes())},   //Dispatching fetchDishes, so that it becomes available for main component
        fetchComments: () => { dispatch(fetchComments())},
        fetchPromos: () => { dispatch(fetchPromos())},
        fetchLeaders: () => { dispatch(fetchLeaders())},
        postFeedback: (firstname,lastname,telnum,email,agree,contactType,message) => { dispatch(postFeedback(firstname,lastname,telnum,email,agree,contactType,message))},
        resetFeedbackForm: () => { dispatch(actions.reset('feedback'))} //This is a predefined action by react-redux-form, which provides the reset actions, once the form is submitted 
    }); //We'll define the addComment property here, which will be equal to the addComment action, along with the parameters

class Main extends Component {
//We'll use lifecycle methods, to fetch the data required for application, when the component is mounted
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }
  render() {
    const HomePage = () => { 
        return(
            <Home/>  
            //In dish, we've to extract all those dishes whose dish feature is true. This is same for leaders and promotions too
        );
    }
    const about = () => {
        return(
            <About leaders={this.props.leaders.leaders}
            leadersLoading={this.props.leaders.isLoading}  
            leadersErrMess={this.props.leaders.errMess} 
            />
        );
    }
    const DishWithId = ({match}) => {
        return(
            <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
              isLoading={this.props.dishes.isLoading}
              ErrMess={this.props.dishes.errMess}
              comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
              commentsErrMess={this.props.comments.errMess}
              postComment={this.props.postComment} />
        );
      };
//The addComment action property we created and made available, will be passed in as an attribute the the
    return (//Inside switch we'll route to the two views, we've created
        <div>
            <Header />
            <TransitionGroup>
                <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                    <Switch>
                            <Route path="/home" component={HomePage} />
                            <Route exact path="/menu" component={()=> <Menu  dishes={this.props.dishes} /> } />
                            <Route path="/menu/:dishId" component={DishWithId} />
                            <Route exact path="/contact" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} /> } />
                            <Route exact path="/about" component= {about} />
                            <Redirect to="/home"/>
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
            
            <Footer /> 
        </div>//We can pass menu component directly, but then we can't pass the props, so we pass it as a function 
    );        //Redirect is used to specify the default route. means if the route doesnt match any of the given route, then it'll be redirected to the homepage
  }
}
 
export default withRouter (connect(mapStateToProps, mapDispatchToProps)(Main));
//Connecting the main component to redux store by wrapping the main into connect which takes mapStateToProps as argument
//If we're using react router, in order make it work, we have to surround whole thing in a withRouter


//Now here we'l have to change all the this.state tp this.props cause state is defined in store and here we're getting the props
//Using mapDispatchToProps, the addComment action property will be available to the main