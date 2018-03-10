import { connect, Dispatch } from 'react-redux';
import { AxiosResponse } from 'axios';
import * as React from 'react';
import { bindActionCreators } from 'redux';

import * as Actions from '../store/actions';
import { StoreState } from '../types/index';
import axios from '../plugins/axios';
import { Section } from '../types/index';

import * as styles from './Guardian.scss';

export interface Props {
  onSetSections: () => void;
  sections: Section[];
}

export interface State {
  title: string;
}

const mapStateToProps = ({ sections }: StoreState) => {
  return { sections };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions.Actions>) => {
  return {
    onSetSections: () => {
      axios.get('sections').then((res: AxiosResponse) => {
        dispatch(Actions.setSections(res.data.response.results));
      });
    }
  };
};

const onSetSections = (dispatch: Dispatch<Actions.Actions>) => {
  axios.get('sections').then((res: AxiosResponse) => {
    dispatch(Actions.setSections(res.data.response.results));
  });
};

class Guardian extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      title: 'Guardian component'
    };
  }

  setSections() {
    console.log('Setting');
  }

  render() {
    let sectionsList = this.props.sections.map((x, index) => (
      <p key={index}><strong>{x.id}</strong> {x.webTitle}</p>
    ));

    return (
      <div className="layout ms_j-center">
        <div className="ms_16">
          <h1 className={styles.heading + ' heading'}>This is heading</h1>
          <h2 className={styles.headingSub}>This is subheading</h2>
          <button onClick={this.props.onSetSections}>Set actions</button>
          {/* <pre>{this.state}</pre> */}
          <hr />
          {sectionsList}
          <hr />
        </div>
      </div>
    );
  }
}

// tslint:disable-next-line:no-any
export default connect(mapStateToProps, mapDispatchToProps)(Guardian as any);
