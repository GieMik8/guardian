import * as React from 'react';
import { match, RouteProps, RouteComponentProps } from 'react-router-dom';
import { connect, Dispatch } from 'react-redux';
import * as H from 'history';
import * as TransitionManager from 'history/createTransitionManager';
import { AxiosResponse } from 'axios';
import * as Scroll from 'react-scroll';

import * as Actions from '~store/actions';
import { StoreState, Section, SelectedEdition, Article, SearchResponse } from '~types';
import * as service from '~services/guardian';
import SingleArticle from '../../components/article/Article';
import * as styles from './Search.scss';
import SearchForm from '~containers/search-form/SearchForm';

interface RouteParams {
  q: string;
}

interface Props {
  sections: Section[];
  searchResponse: SearchResponse;
  search: (q: string) => void;
}

interface State {
  search: string;
}

const Element = Scroll.Element;
const scroller = Scroll.scroller;

const mapStateToProps = ({ searchResponse }: StoreState) => {
  return { searchResponse };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions.Actions>) => {
  return {
    search: (q: string) => {
      service.search(q).then((response: AxiosResponse) => {
        dispatch(Actions.setSearchResponse(response.data.response));
        scroller.scrollTo('heading', { containerId: 'pageBody', offset: -50 });
      });
    }
  };
};

class Search extends React.Component<RouteComponentProps<RouteParams> & Props, State> {
  private unlisten: H.UnregisterCallback;

  constructor(props: RouteComponentProps<RouteParams> & Props) {
    super(props);
    this.state = {
      search: this.props.location.search
    };
  }

  componentDidMount() {
    if (this.state.search) {
      this.props.search('search' + this.state.search);
    }
    this.unlisten = this.props.history.listen((location: H.Location) => {
      if (location.search && location.search !== this.state.search) {
        this.setState({ search: location.search }, () => {
          this.props.search('search' + this.state.search);
        });
      }
    });
  }
  
  render() {
    let articleList;
    let articleListWrapper;
    if (this.props.searchResponse.results && this.props.searchResponse.results.length > 0) {
      articleList = this.props.searchResponse.results.map((x: Article) => (
        <SingleArticle key={x.id} article={x} />
      ));
      articleListWrapper = <div>{articleList}</div>;
    } else {
      articleListWrapper = <p className="notification">No results</p>;
    }

    let searchQuery = this.state.search.replace('?q=', '');

    return (
      <div className={styles.articles}>
        <div className={styles.searchForm}>
          <SearchForm extent="large"/>
        </div>
        <Element name="heading">
          <h2 className={styles.heading}>
            Search results: <span className="c_blue">{searchQuery}</span>
          </h2>
        </Element>
        {articleListWrapper}
      </div>
    );
  }

}

// tslint:disable-next-line: no-any
export default connect(mapStateToProps, mapDispatchToProps)(Search as any);
