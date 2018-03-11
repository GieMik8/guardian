export class Section {
  apiUrl: string;
  id: string;
  webTitle: string;
  webUrl: string;
  editions: Edition[];
}

export class Edition {
  apiUrl: string;
  code: string;
  id: string;
  webTitle: string;
  webUrl: string;
}

export class SelectedEdition {
  currentPage: string;
  edition: Edition;
  pageSize: 10;
  pages: 2;
  results: Article[];
  section: Section;
  startIndex: number;
  status: string;
  total: number;
  userTier: string;
}

export class Article {
  apiUrl: string;
  id: string;
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
  sectionId: string;
  sectionName: string;
  type: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
}

export interface StoreState {
  sections: Section[];
  selectedEdition: SelectedEdition;
}