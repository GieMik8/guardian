import * as React from 'react';

export enum IconSizes {
  xs = 'xs', 
  sm = 'sm', 
  md = 'md', 
  lg = 'lg'
}

export interface IconProps {
  icon: string;
  classes?: string[];
  size?: IconSizes;
}

const Icon = (props: IconProps) => {
  let iconClasses = ['svg__icon'];
  if (props.size) {
    iconClasses.push(props.size);
  }
  
  if (props.classes && props.classes.length > 0) {
    iconClasses = iconClasses.concat(props.classes);
  }

  return (
    <span
      className={iconClasses.join(' ')} 
      dangerouslySetInnerHTML={{ __html: props.icon }} 
    />
  );
};

export default Icon;
