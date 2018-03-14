import * as React from 'react';

import * as styles from './ToggleBurger.scss';

export interface Props {
  open: boolean;
  toggle: (event: boolean) => void;
}

const ToggleBurger = (props: Props) => {
  return (
    <div className={styles.toggleWrapper}>
      <div className={styles.toggleMenuBar}>
        <input 
          onChange={(event) => props.toggle(event.currentTarget.checked)}
          checked={props.open} 
          type="checkbox"
        />
        <span />
      </div>
    </div>
  );
};

export default ToggleBurger;
