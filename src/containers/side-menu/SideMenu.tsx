import * as React from 'react';
import { Section } from '~types';
import PerfectScrollbar from 'perfect-scrollbar';
import { Link } from 'react-router-dom';

import * as styles from './SideMenu.scss';
import Icon from '../../components/icon/Icon';
import settings from '~environment/index';

const Logo = require('../../assets/logo.svg');

interface Props {
  sections: Section[];
  setEdition: (id: string) => void;
}

interface State {
  slogan: string;
  version: number;
}

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
    let sectionsList = this.props.sections.map((x: Section, index: number) => (
      <Link
        to={`/articles/${x.id}`}
        className={styles.item}
        onClick={() => this.props.setEdition(x.id)} 
        key={index}
      >
        <span className={styles.itemTitle}>{x.webTitle}</span>
        <span className={styles.itemSubtitle}>{x.id}</span>
      </Link>
    ));

    let sectionListWrapper = <nav>{sectionsList}</nav>;

    return (
      <div className={styles.sideMenu}>
        <div className={styles.heading + ' ms_t-center'}>
          <Icon classes={[styles.logo]} icon={Logo}/>
          <h2 className={styles.slogan}>{this.state.slogan}</h2>
        </div>
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

export default SideMenu;
