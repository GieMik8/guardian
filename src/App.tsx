import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { AxiosResponse } from 'axios';
import PerfectScrollbar from 'perfect-scrollbar';
import * as ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Link, match } from 'react-router-dom';

import * as Actions from '~store/actions';
import { StoreState, SelectedEdition, Section } from '~types';
import axios from '~plugins/axios';
import * as service from '~services/guardian';

import SideMenu from '~containers/side-menu/SideMenu';
import Header from './components/header/Header';
import Content from './components/content/Content';
import Home from './components/home/Home';
import asyncComponent from './components/async-component/AsyncComponent';

import * as styles from './App.scss';

interface Props {
  setSections: () => void;
  setEdition: (id: string) => void;
  sections: Section[];
  selectedEdition: SelectedEdition;
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
    },
    setEdition: (id: string) => {
      service.getEdition(id).then((response: AxiosResponse) => {
        dispatch(Actions.setSelectedEdition(response.data.response));
      });
    }
  };
};

const AsyncArticles = asyncComponent(() => {
  return import(/* webpackChunkName = "articles" */'./containers/articles/Articles');
});

class App extends React.Component<Props, void> {
  // tslint:disable-next-line: no-any
  private bodyMainContainer: any;
  private bodyMainScrollbar: PerfectScrollbar;

  constructor(props: Props) {
    super(props);
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
              <SideMenu setEdition={this.props.setEdition} sections={this.props.sections}/>
            </aside>
            <div ref={ref => this.bodyMainContainer = ref} className={styles.bodyMain}>
              <header className={styles.bodyHeader}>
                <Header />
              </header>
              <main className={styles.bodyContent}>
                <div>
                  <Route exact={true} path="/" component={Home} />
                  {/* <Route exact={true} path="/details/:id" component={(props) => <Articles />} /> */}
                  <Route exact={true} path="/articles/:id" component={AsyncArticles} />
                </div>
                {/* <Content selectedEdition={this.props.selectedEdition}/> */}
              </main>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

// tslint:disable-next-line: no-any
export default connect(mapStateToProps, mapDispatchToProps)(App as any);
