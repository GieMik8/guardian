
import * as constants from '../constants';
import { Section } from '~types/index';

export interface SetSections {
  type: constants.SET_SECTIONS;
  sections: Array<Section>;
}

export type Actions = SetSections;

export function setSections(sections: Section[]): SetSections {
  return {
    type: constants.SET_SECTIONS,
    sections: sections
  };
} 