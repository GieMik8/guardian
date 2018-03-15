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
import SearchForm from '~containers/search-form/SearchForm';
import Content from './components/content/Content';
import Home from './components/home/Home';
import asyncComponent from './components/async-component/AsyncComponent';
import ToggleBurger from './components/toogle-burger/ToggleBurger';

import * as styles from './App.scss';

interface Props {
  setSections: () => void;
  sections: Section[];
  selectedEdition: SelectedEdition;
}

interface State {
  searchQuery: string;
  sideOpen: boolean;
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
      searchQuery: '',
      sideOpen: false
    };
  }

  componentDidMount() {
    this.props.setSections();
    this.bodyMainScrollbar = new PerfectScrollbar(this.bodyMainContainer);
  }

  render() {
    let sideMenuOpen = this.state.sideOpen;
    let bodyWrapperClasses = [styles.bodyWrapper];
    let bodySideMenuClasses = [styles.bodySidemenu];
    if (sideMenuOpen) {
      bodyWrapperClasses.push('open');
      bodyWrapperClasses.push(styles.open);
      bodySideMenuClasses.push(styles.bodySidemenuOpen);
    }

    return (
      <div className={bodyWrapperClasses.join(' ')}>
        <Router>
          <div className={styles.bodyInner}>
            <aside className={bodySideMenuClasses.join(' ')}>
              <SideMenu closeSideMenu={() => this.toggleSide(false)} />
            </aside>
            <div id="pageBody" ref={ref => this.bodyMainContainer = ref} className={styles.bodyMain}>
              <header className={styles.bodyHeader}>
                <div className="container">
                  <div className={styles.headerInner}>
                    <div className="layout sm ms_j-between ms_d-row-reverse">
                      <ToggleBurger open={this.state.sideOpen} toggle={(event) => this.toggleSide(event)} />
                      <SearchForm extent="small"/>
                    </div>
                  </div>
                </div>
                <p>{this.state.searchQuery}</p>
              </header>
              <main className={styles.bodyContent}>
                <div className="container" >
                  <Route exact={true} path="/" component={Home} />
                  <Route exact={true} path="/articles/:id" component={AsyncArticles} />
                  <Route exact={true} path="/search" component={AsyncSearch} />
                </div>
              </main>
            </div>
          </div>
        </Router>
        <div onClick={() => this.toggleSide(false)} className={styles.bodyBackdrop}>&nbsp;</div>
      </div>
    );
  }

  private toggleSide(value: boolean) {
    this.setState({ sideOpen: value });
  }
}

// tslint:disable-next-line: no-any
export default connect(mapStateToProps, mapDispatchToProps)(App as any);
