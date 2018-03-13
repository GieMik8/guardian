import { Store, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { StoreState } from '~types';
import { guardian } from '~store/reducers';

export default function configureStore(
  initialState: StoreState,
): Store<StoreState> {
  const composeEnhancers = composeWithDevTools({});
  return createStore<StoreState>(
    guardian,
    initialState,
    composeEnhancers()
  );
}