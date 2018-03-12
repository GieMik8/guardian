import * as React from 'react';
import { Section } from '~types';
import PerfectScrollbar from 'perfect-scrollbar';

import * as styles from './SideMenu.scss';
import Icon from '../../components/icon/Icon';

const Logo = require('../../assets/logo.svg');

interface Props {
  sections: Section[];
  setEdition: (id: string) => void;
}

class SideMenu extends React.Component<Props, {}> {
  // tslint:disable-next-line: no-any
  private sideMenuContainer: any;
  private sideMenuScrollbar: PerfectScrollbar;

  constructor(props: Props) {
    super(props);
  }
  
  componentDidMount() {
    console.log(this.sideMenuContainer);
    this.sideMenuScrollbar = new PerfectScrollbar(this.sideMenuContainer); 
  }

  render() {
    let sectionsList = this.props.sections.map((x: Section, index: number) => (
      <a 
        className={styles.item} 
        title={x.id} 
        onClick={() => this.props.setEdition(x.id)} 
        key={index}
      >
        <span className={styles.itemTitle}>{x.webTitle}</span>
        <span className={styles.itemSubtitle}>{x.id}</span>
      </a>
    ));

    let sectionListWrapper = <nav>{sectionsList}</nav>;

    return (
      <div className={styles.sideMenu}>
        <div className={styles.heading + ' ms_t-center'}>
          <Icon classes={[styles.logo]} icon={Logo}/>
        </div>
        <div className={styles.menu} ref={ref => this.sideMenuContainer = ref}>
          {sectionListWrapper}
          <footer>
            <span>v.0.3 {new Date().getFullYear()}</span>
          </footer>
        </div>
      </div>
    );
  }
}

export default SideMenu;
