import { connect, Dispatch } from 'react-redux';
import { AxiosResponse } from 'axios';
import * as React from 'react';
import PerfectScrollbar from 'perfect-scrollbar';

import * as Actions from '~store/actions';
import { StoreState, SelectedEdition, Section } from '~types';
import axios from '~plugins/axios';
import * as service from '~services/guardian';

import SideMenu from '~containers/side-menu/SideMenu';
import Header from './components/header/Header';
import Content from './components/content/Content';

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
        <div className={styles.bodyInner}>
          <div className={styles.bodySidemenu}>
            <SideMenu setEdition={this.props.setEdition} sections={this.props.sections}/>
          </div>
          <div ref={ref => this.bodyMainContainer = ref} className={styles.bodyMain}>
            <div className={styles.bodyHeader}>
              <Header />
            </div>
            <div className={styles.bodyContent}>
              <Content selectedEdition={this.props.selectedEdition}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// tslint:disable-next-line: no-any
export default connect(mapStateToProps, mapDispatchToProps)(App as any);
