import React, { Component } from 'react'; 
import Main  from './components/MainComponent';//first me link
import './App.css';
import { BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux'; 
import { ConfigureStore } from './redux/configureStore';
const store = ConfigureStore();//This is how store is available 
//This provider component allows to configure the react app, so that redux store is available to all compo's of application
//Provider takes one argument, which is store and we'll assign it's value to the store object we defined
//In order to store the state we need to define it in a constructer
//We can make state available to menu compo using props
//In order to use a router, we have to enclose the whole structure in <BrowserRouter>
//In order to use a redux store, we have to enclose the whole structure in <Provider>
class App extends Component {
  
  render() {
    return (
      <Provider store={store}> 
        <BrowserRouter>
          <div>
            <Main/> 
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
 