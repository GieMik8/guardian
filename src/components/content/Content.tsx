import * as React from 'react';

import { SelectedEdition } from '~types';
import * as styles from './Content.scss';

interface Props {
  selectedEdition: SelectedEdition;
}

const Content = (props: Props) => {
  let noArticles = <p className="notification">No Articles</p>;
  let articles;

  if (props.selectedEdition.results && props.selectedEdition.results.length > 0) {
    articles = props.selectedEdition.results.map((x, index) => {
      return (
        <p key={index}>{x.webTitle}</p>
      );
    });
  }

  return (
    <div>
      <h2>Content</h2>
      {articles}
    </div>
  );
};

export default Content;
