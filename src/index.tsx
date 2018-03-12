import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, Store } from 'redux';
import { Provider } from 'react-redux';

import App from './App';
import { guardian } from './store/reducers';
import { StoreState, SelectedEdition } from './types';

import '~style/grid.scss';
import '~style/style.scss';

const store: Store<StoreState> = createStore<StoreState>(guardian, {
  sections: [],
  selectedEdition: new SelectedEdition()
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
