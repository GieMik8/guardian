import * as React from 'react';
import { match, RouteProps, RouteComponentProps } from 'react-router-dom';
import { connect, Dispatch } from 'react-redux';
import * as H from 'history';
import * as TransitionManager from 'history/createTransitionManager';
import { AxiosResponse } from 'axios';
import * as Scroll from 'react-scroll';

import * as Actions from '~store/actions';
import { StoreState, Section, SelectedEdition, Article } from '~types';
import * as service from '~services/guardian';
import SingleArticle from '../../components/article/Article';
import * as styles from './Articles.scss';

interface RouteParams {
  id: string;
}

interface Props {
  sections: Section[];
  selectedEdition: SelectedEdition;
  setEdition: (id: string) => void;
}

interface State {
  sectionId: string;
}

const Element = Scroll.Element;
const scroller = Scroll.scroller;

const mapStateToProps = ({ selectedEdition }: StoreState) => {
  return { selectedEdition };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions.Actions>) => {
  return {
    setEdition: (id: string) => {
      service.getEdition(id).then((response: AxiosResponse) => {
        dispatch(Actions.setSelectedEdition(response.data.response));
        scroller.scrollTo('heading', { containerId: 'pageBody', offset: -50 });
      });
    }
  };
};

class Articles extends React.Component<RouteComponentProps<RouteParams> & Props, State> {

  constructor(props: RouteComponentProps<RouteParams> & Props) {
    super(props);
    this.state = {
      sectionId: this.props.match.params.id
    };
  }

  componentWillReceiveProps(newProps: RouteComponentProps<RouteParams> & Props) {
    if (newProps.match.params.id !== this.state.sectionId) {
      this.setState({ sectionId: newProps.match.params.id }, () => {
        this.props.setEdition(this.state.sectionId);
      });
    }
  }

  componentDidMount() {
    this.props.setEdition(this.state.sectionId);
  }
  
  render() {
    let articleList;
    let articleListWrapper;
    if (this.props.selectedEdition.results && this.props.selectedEdition.results.length > 0) {
      articleList = this.props.selectedEdition.results.map((x: Article) => (
        <SingleArticle key={x.id} article={x} />
      ));
      articleListWrapper = <div>{articleList}</div>;
    } else {
      articleListWrapper = <p className="notification">No articles</p>;
    }

    return (
      <div className={styles.articles}>
        <Element name="heading">
          <h2 className={styles.heading}>
            {this.props.selectedEdition.edition && this.props.selectedEdition.edition.webTitle || 'Nothing'}
          </h2>
        </Element>
        {articleListWrapper}
      </div>
    );
  }
}

// tslint:disable-next-line: no-any
export default connect(mapStateToProps, mapDispatchToProps)(Articles as any);
