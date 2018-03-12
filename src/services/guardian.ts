import axios from '~plugins/axios';
import { AxiosPromise } from 'axios';
import { Section, SelectedEdition } from '~types';

/**
 * Get Sections list
 * 
 * @returns AxiosPromise - with results of sections list;
 */
export const getSections = (): AxiosPromise => axios.get('sections');

/**
 * Gets Specific edition
 * 
 * @param editionId - Edition Id
 * @returns AxiosPromise - with specific edition content
 */
export const getEdition = (editionId: string): AxiosPromise => axios.get(editionId);
