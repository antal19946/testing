import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../Action'
import rootReducer from '../../store/reducers';

export default configureStore({
  reducer: {
    counter: counterReducer,
    ...rootReducer
  },
})


// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { createStore, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
// import "react-datepicker/dist/react-datepicker.css";

// const store = createStore(rootReducer, applyMiddleware(thunk));
