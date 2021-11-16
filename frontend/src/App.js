import React from 'react';
import Main from './routes/MainRouter';
import './App.css';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import rootReducer from './redux/configureStore';
import thunk from 'redux-thunk';
import logger from 'redux-logger';


const store = createStore(rootReducer,applyMiddleware(thunk, logger));

function App() {

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

export default App;

