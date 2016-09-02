import {App} from './container/app'
import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import {reducer} from './reducers/reducer';
import {WholeSearch, AlertPanel,HandlePanel,CheckItemGroupPanelBox,ServiceDetailModal,ServerDetailModal,NotificationPanel} from './components/healthComponents'





const store=createStore(reducer);

//container
export const connection=connect(
  function mapStateToProps(state) {
    return{state :state};
  },
  function mapDispatchToProps(dispatch) {
    return {
    //addTodo: text => dispatch(addTodo(text)),
    //toggleTodo: id => dispatch(toggleTodo(id))
     };
  }
)(WholeSearch,AlertPanel,HandlePanel,CheckItemGroupPanelBox,ServerDetailModal,ServiceDetailModal,
  NotificationPanel);


ReactDOM.render(
    <Provider store={store}>
            <App />
     </Provider>,
    document.getElementById('app'))