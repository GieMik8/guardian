import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, Store } from 'redux';
import { Provider } from 'react-redux';

import Guardian from './containers/Guardian';
import { guardian } from './store/reducers/index';
import { StoreState } from './types/index';

import './style/grid.scss';
import './style/style.scss';

const store: Store<StoreState> = createStore<StoreState>(guardian, {
  sections: []
});

ReactDOM.render(
  <Provider store={store}>
    <Guardian />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
