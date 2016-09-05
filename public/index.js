import {App} from './container/app'
import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import {reducer} from './reducers/reducer';





const store=createStore(reducer);

//container
console.log("connect")
export const Abc = connect(
  function mapStateToProps(state) {
    console.log("here");
    console.log(state.get('groups'));
    return{groups :state.get('groups'),
           checkItemStructure:state.get('checkItemStructure'),
           alertCheckItems:state.get("alertCheckItems"),
           notificationsContent:state.get('notificationsContent'),
           totalAlerts:state.get("totalAlerts")
           };
  })(App);

//console.log(App);
//console.log(Abc);

ReactDOM.render(
    <Provider store={store}>
           <Abc />
     </Provider>,
    document.getElementById('app'))






