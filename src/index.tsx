import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, Store } from 'redux';
import { Provider } from 'react-redux';

import App from './App';
import { SelectedEdition, SearchResponse } from './types';
import configureStore from '~helpers/configure-store';

import '~style/grid.scss';
import '~style/style.scss';

const store = configureStore({
  sections: [],
  selectedEdition: new SelectedEdition(),
  searchResponse: new SearchResponse()
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
