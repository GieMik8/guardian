import axios from '~plugins/axios';
import { AxiosPromise } from 'axios';
import { Section, SelectedEdition } from '~types';

export const getSections = (): AxiosPromise => axios.get('sections');
export const getEdition = (editionId: string): AxiosPromise => axios.get(editionId);
