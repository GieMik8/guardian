import { connect, Dispatch } from 'react-redux';
import { AxiosResponse } from 'axios';
import * as React from 'react';

import * as Actions from '../store/actions';
import { StoreState } from '../types/index';
import axios from '../axios';
import { Section } from '../types/index';

import * as styles from './Guardian.scss';

export interface Props {
  onSetSections?: () => void;
  sections: Section[];
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

const Guardian = ({ onSetSections, sections }: Props) => {
  let sectionsList = sections.map((x, index) => (
    <p key={index}><strong>{x.id}</strong> {x.webTitle}</p>
  ));

  return (
    <div className="layout ms_j-center">
      <div className="ms_16">
        <h1 className={styles.heading + ' heading'}>This is heading</h1>
        <h2 className={styles.headingSub}>This is subheading</h2>
        <button className={styles.jomajo} onClick={onSetSections}>Set actions</button>
        <hr />
        {sectionsList}
        <hr />
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Guardian);
