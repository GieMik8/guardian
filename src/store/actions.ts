
import * as constants from './constants';
import { Section, SelectedEdition } from '~types';

export interface SetSections {
  type: constants.SET_SECTIONS;
  sections: Array<Section>;
}

export interface SetSelectedEdition {
  type: constants.SET_SELECTED_EDITION;
  selectedEdition: SelectedEdition;
}

export const setSections = (sections: Section[]): SetSections => {
  return { type: constants.SET_SECTIONS, sections };
};

export const setSelectedEdition = (selectedEdition: SelectedEdition): SetSelectedEdition => {
  return { type: constants.SET_SELECTED_EDITION, selectedEdition };
};

export type Actions = SetSections | SetSelectedEdition;