import * as Actions from '../actions';
import { StoreState } from '../../types/index';
import * as Constants from '../constants/index';

export function guardian(state: StoreState, action: Actions.Actions): StoreState {
  switch (action.type) {
    case Constants.SET_SECTIONS:
      return {
        ...state, 
        sections: action.sections
      };
    default:
      return state;
  }
}
