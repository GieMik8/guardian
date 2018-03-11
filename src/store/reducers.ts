import * as Actions from './actions';
import { StoreState } from '~types';
import * as Constants from './constants';

export function guardian(state: StoreState, action: Actions.Actions): StoreState {
  switch (action.type) {
    case Constants.SET_SECTIONS:
      return {
        ...state, 
        sections: action.sections
      };
    case Constants.SET_SELECTED_EDITION:
      return {
        ...state,
        selectedEdition: action.selectedEdition
      };
    default:
      return state;
  }
}
