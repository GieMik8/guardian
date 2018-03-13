import * as React from 'react';
import * as moment from 'moment';
import { Link } from 'react-router-dom';

import { SelectedEdition, Article } from '~types';
import * as styles from './Article.scss';

interface Props {
  article: Article;
}

const SingleArticle = (props: Props) => {
  let article = props.article;
  return (
    <article className={styles.article}>
      <h2 className={styles.title}>{article.webTitle}</h2>
      <p className={styles.info}>
        <span>{article.pillarName}</span>
        <span>{article.sectionName}</span>
        <span>{
          moment(article.webPublicationDate).format('YYYY-MM-DD') 
          + '  –  ' + 
          moment(article.webPublicationDate).fromNow()}</span>
      </p>
      <a target="_blank" href={article.webUrl}>
        <div className={styles.link}>{article.webUrl}</div>
      </a>
    </article>
  );
};

export default SingleArticle;
