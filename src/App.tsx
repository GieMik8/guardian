import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { AxiosResponse } from 'axios';
import PerfectScrollbar from 'perfect-scrollbar';
import * as ReactDOM from 'react-dom';
import { 
  Route, 
  BrowserRouter as Router, 
  Link, 
  match, 
  withRouter
} from 'react-router-dom';

import * as Actions from '~store/actions';
import { StoreState, SelectedEdition, Section } from '~types';
import axios from '~plugins/axios';
import * as service from '~services/guardian';

import SideMenu from '~containers/side-menu/SideMenu';
import Header from '~containers/header/Header';
import Content from './components/content/Content';
import Home from './components/home/Home';
import asyncComponent from './components/async-component/AsyncComponent';

import * as styles from './App.scss';

interface Props {
  setSections: () => void;
  sections: Section[];
  selectedEdition: SelectedEdition;
}

interface State {
  searchQuery: string;
}

const mapStateToProps = ({ sections, selectedEdition }: StoreState) => {
  return { sections, selectedEdition };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions.Actions>) => {
  return {
    setSections: () => {
      service.getSections().then((response: AxiosResponse) => {
        dispatch(Actions.setSections(response.data.response.results));
      });
    }
  };
};

const AsyncArticles = asyncComponent(() => {
  return import(/* webpackChunkName = "articles" */'./containers/articles/Articles');
});

const AsyncSearch = asyncComponent(() => {
  return import(/* webpackChunkName = "articles" */'./containers/search/Search');
});

class App extends React.Component<Props, State> {
  // tslint:disable-next-line: no-any
  private bodyMainContainer: any;
  private bodyMainScrollbar: PerfectScrollbar;

  constructor(props: Props) {
    super(props);
    this.state = {
      searchQuery: ''
    };
  }

  componentDidMount() {
    this.props.setSections();
    this.bodyMainScrollbar = new PerfectScrollbar(this.bodyMainContainer);
  }

  render() {
    return (
      <div className={styles.bodyWrapper}>
        <Router>
          <div className={styles.bodyInner}>
            <aside className={styles.bodySidemenu}>
              <SideMenu />
            </aside>
            <div id="pageBody" ref={ref => this.bodyMainContainer = ref} className={styles.bodyMain}>
              <header className={styles.bodyHeader}>
                <Header/>
                <p>{this.state.searchQuery}</p>
              </header>
              <main className={styles.bodyContent}>
                <div className="container" >
                  <Route exact={true} path="/" component={Home} />
                  {/* <Route exact={true} path="/details/:id" component={(props) => <Articles />} /> */}
                  <Route exact={true} path="/articles/:id" component={AsyncArticles} />
                  <Route exact={true} path="/search" component={AsyncSearch} />
                </div>
              </main>
            </div>
          </div>
        </Router>
      </div>
    );
  }

  private searchSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(this.props);
  }
}

// tslint:disable-next-line: no-any
export default connect(mapStateToProps, mapDispatchToProps)(App as any);
