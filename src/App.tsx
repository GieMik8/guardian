import { connect, Dispatch } from 'react-redux';
import { AxiosResponse } from 'axios';
import * as React from 'react';

import * as Actions from '~store/actions';
import { StoreState, SelectedEdition, Section } from '~types';
import axios from '~plugins/axios';
import * as service from '~services/guardian';

import * as styles from './App.scss';

interface Props {
  setSections: () => void;
  setEdition: (id: string) => void;
  sections: Section[];
}

const mapStateToProps = ({ sections }: StoreState) => {
  return { sections };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions.Actions>) => {
  return {
    setSections: () => {
      service.getSections().then((results) => {
        dispatch(Actions.setSections(results.data.response.results));
      });
    },
    setEdition: (id: string) => {
      service.getEdition(id).then(response => {
        dispatch(Actions.setSelectedEdition(response.data.response.results));
      });
    }
  };
};

class App extends React.Component<Props, void> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    let sectionsList = this.props.sections.map((x, index) => (
      <p onClick={() => this.props.setEdition(x.id)} key={index}><strong>{x.id}</strong> {x.webTitle}</p>
    ));
    
    return (
      <div className="layout ms_j-center">
        <div className="ms_16">
          <h1 className={styles.heading + ' heading'}>This is heading</h1>
          <h2 className={styles.headingSub}>This is subheading</h2>
          <button onClick={this.props.setSections}>Set actions</button>
          <hr />
          {sectionsList}
          <hr />
        </div>
      </div>
    );
  }
}

// tslint:disable-next-line: no-any
export default connect(mapStateToProps, mapDispatchToProps)(App as any);
