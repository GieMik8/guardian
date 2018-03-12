import * as React from 'react';
import { Section } from '~types';
import PerfectScrollbar from 'perfect-scrollbar';

import * as styles from './SideMenu.scss';

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
    this.sideMenuScrollbar = new PerfectScrollbar(this.sideMenuContainer);
  }

  render() {
    let sectionsList = this.props.sections.map((x: Section, index: number) => (
      <p onClick={() => this.props.setEdition(x.id)} key={index}><strong>{x.id}</strong> {x.webTitle}</p>
    ));

    return (
      <div ref={ref => this.sideMenuContainer = ref} className={styles.sideMenu}>
        <h2>This is side menu</h2>
        {sectionsList}
      </div>
    );
  }
}

export default SideMenu;
