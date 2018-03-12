import * as React from 'react';
import { match } from 'react-router-dom';

interface RouteParams {
  id: string;
}

interface DetailsProps {
  match: match<RouteParams>;
}

const Articles = (props: DetailsProps) => {
  let articleId = props.match.params.id;
  return (
    <div>
      <h2>Articles {articleId}</h2>
    </div>
  );
};

export default Articles;
