import * as React from 'react';
import { Section } from '~types';
import PerfectScrollbar from 'perfect-scrollbar';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';
import { connect } from 'react-redux';

import * as Actions from '~store/actions';
import * as styles from './SideMenu.scss';
import Icon from '../../components/icon/Icon';
import settings from '~environment/index';
import { SelectedEdition, StoreState } from '~types';
import * as service from '~services/guardian';

const Logo = require('../../assets/logo.svg');

interface State {
  slogan: string;
  version: number;
}

interface Props {
  setSections: () => void;
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
    }
  };
};

class SideMenu extends React.Component<Props, State> {
  // tslint:disable-next-line: no-any
  private sideMenuContainer: any;
  private sideMenuScrollbar: PerfectScrollbar;

  constructor(props: Props) {
    super(props);
    this.state = {
      slogan: settings.SLOGAN,
      version: settings.VERSION
    };
  }
  
  componentDidMount() {
    this.sideMenuScrollbar = new PerfectScrollbar(this.sideMenuContainer); 
  }

  render() {
    let sectionsList = this.props.sections.map((x: Section, index: number) => {
      let linkClasses = styles.item;
      if (this.props.selectedEdition.edition && x.id === this.props.selectedEdition.edition.id) {
        linkClasses = styles.activeItem;
      }
      return (
        <Link
          to={`/articles/${x.id}`}
          className={linkClasses}
          key={index}
        >
          <span className={styles.itemTitle}>{x.webTitle}</span>
          {/* <span className={styles.itemSubtitle}>{x.id}</span> */}
        </Link>
      );
    });

    let sectionListWrapper = <nav>{sectionsList}</nav>;
    let editionId;

    if (this.props.selectedEdition.edition && this.props.selectedEdition.edition.id) {
      editionId = this.props.selectedEdition.edition.id;
    }

    return (
      <div className={styles.sideMenu}>
        <Link to="/">
          <div className={styles.heading + ' ms_t-center'}>
            <Icon classes={[styles.logo]} icon={Logo}/>
            <h2 className={styles.slogan}>{this.state.slogan}</h2>
          </div>
        </Link>
        <div className={styles.menu} ref={ref => this.sideMenuContainer = ref}>
          {sectionListWrapper}
          <footer>
            <span>v.{settings.VERSION} {new Date().getFullYear()}</span>
          </footer>
        </div>
      </div>
    );
  }
}

// tslint:disable-next-line: no-any
export default connect(mapStateToProps, mapDispatchToProps)(SideMenu as any);
