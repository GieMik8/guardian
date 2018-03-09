export class Section {
  apiUrl: string;
  id: number;
  webTitle: string;
  webUrl: string;
}

export interface StoreState {
  sections: Section[];
}